document.addEventListener('DOMContentLoaded', () => {
    
    // --- STATE MANAGEMENT ---
    let inventory = { rawMaterials: [], labor: [], packing: [], savedBills: [] };
    let currentInvoice = { items: [], details: {} };
    let billCounter = 0;
    
    // YOUR CUSTOM PRELOADED DATA IS USED HERE
    const PRELOADED_DATA = {
        rawMaterials: [
           { name: "Bangles 8-cut", unit: "Pcs", price: 1.67 },
           { name: "Bangles 4-cut", unit: "Pcs", price: 2.50 },
           { name: "Threads", unit: "Reel", price: 22.00 },
           { name: "Kundan (Eye shape)", unit: "Grm", price: 3.00 },
           { name: "Kundan (Square shape)", unit: "Grm", price: 2.70 },
           { name: "White stones", unit: "Grm", price: 3.00 },
           { name: "Kundan (Drop shape)", unit: "Grm", price: 1.25 },
           { name: "Square stones", unit: "Grm", price: 2.00 },
           { name: "Glass bangles", unit: "Pcs", price: 10.00 }
        ],
        labor: [
            { name: "Tanuja", rate: 50.00 }, { name: "Kris", rate: 200.00 }, { name: "Bhri", rate: 200.00 }
        ],
        packing: [
            { name: "Box", unit: "Pcs", price: 30.00 },
            { name: "Wrapping cover", unit: "Mtr", price: 4.00 },
            { name: "Stickers", unit: "Pcs", price: 4.25 },
            { name: "Normal handover cover", unit: "Pcs", price: 1.00 }
        ]
    };
    
    // --- DOM SELECTORS ---
    const tables = {
        rawMaterials: document.getElementById("table-raw-materials"),
        labor: document.getElementById("table-labor"),
        packing: document.getElementById("table-packing"),
        invoice: document.getElementById("invoice-items-table").querySelector("tbody"),
        savedBills: document.getElementById("table-saved-bills").querySelector("tbody")
    };
    const summaryFields = {
        rawMaterials: document.getElementById("summary-raw-materials"),
        wages: document.getElementById("summary-wages"),
        packing: document.getElementById("summary-packing"),
        subtotal: document.getElementById("summary-subtotal"),
        otherExpenses: document.getElementById("summary-other-expenses"),
        makingCost: document.getElementById("summary-making-cost"),
        profit: document.getElementById("summary-profit"),
        profitSelect: document.getElementById("profit-percentage-select"),
        customProfitInput: document.getElementById("custom-profit-input"),
        expenseSelect: document.getElementById("expense-percentage-select"),
        customExpenseInput: document.getElementById("custom-expense-input"),
        discountInput: document.getElementById("discount-input"),
        finalPrice: document.getElementById("summary-final-price")
    };
    const forms = {
        rawMaterial: document.getElementById("form-raw-material"),
        labor: document.getElementById("form-labor"),
        packing: document.getElementById("form-packing")
    };
    const itemAdder = {
        type: document.getElementById("item-type-select"),
        item: document.getElementById("item-select"),
        quantity: document.getElementById("item-quantity"),
        button: document.getElementById("btn-add-item")
    };
    const invoiceDetailsFields = {
        customer: document.getElementById('customer-name'),
        product: document.getElementById('product-name'),
        date: document.getElementById('bill-date'),
        id: document.getElementById('bill-id'),
        notes: document.getElementById('order-notes')
    };
    
    function loadData() {
        const savedData = localStorage.getItem("banglesAppData_v5");
        const savedCounter = localStorage.getItem("banglesBillCounter");
        if (savedData) {
            inventory = JSON.parse(savedData);
        } else {
            inventory.rawMaterials = PRELOADED_DATA.rawMaterials;
            inventory.labor = PRELOADED_DATA.labor;
            inventory.packing = PRELOADED_DATA.packing;
        }
        if (savedCounter) {
            billCounter = parseInt(savedCounter, 10);
        }
    }
    
    function saveData() {
        localStorage.setItem("banglesAppData_v5", JSON.stringify(inventory));
        localStorage.setItem("banglesBillCounter", billCounter);
    }
    
    function renderAll() {
        renderInventoryTables();
        renderSavedBills();
    }
    
    function renderInventoryTables() {
        renderTable(inventory.rawMaterials, tables.rawMaterials, ["Name", "Unit", "Price/Unit"], "rawMaterials");
        renderTable(inventory.labor, tables.labor, ["Name", "Hourly Rate"], "labor");
        renderTable(inventory.packing, tables.packing, ["Name", "Unit", "Price/Unit"], "packing");
        updateItemAdder();
    }
    
    function renderTable(data, tableElement, headers, type) {
        tableElement.innerHTML = ``;
        data.forEach((item, index) => {
            const row = tableElement.insertRow();
            Object.values(item).forEach(val => {
                const cell = row.insertCell();
                cell.textContent = typeof val === "number" ? val.toFixed(2) : val;
            });
            const actionCell = row.insertCell();
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "&times;";
            deleteBtn.className = "delete-btn";
            deleteBtn.onclick = () => {
                inventory[type].splice(index, 1);
                saveData();
                renderInventoryTables();
            };
            actionCell.appendChild(deleteBtn);
        });
    }
    
    function renderInvoice() {
        tables.invoice.innerHTML = "";
        currentInvoice.items.forEach((item, index) => {
            const row = tables.invoice.insertRow();
            row.insertCell().textContent = item.type.replace("-", " ").toUpperCase();
            row.insertCell().textContent = item.description;
            row.insertCell().textContent = item.quantity;
            row.insertCell().textContent = `₹${item.unitPrice.toFixed(2)}`;
            row.insertCell().textContent = `₹${item.total.toFixed(2)}`;
            const actionCell = row.insertCell();
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "&times;";
            deleteBtn.className = "delete-btn";
            deleteBtn.onclick = () => {
                currentInvoice.items.splice(index, 1);
                renderInvoice();
            };
            actionCell.appendChild(deleteBtn);
        });
        calculateSummary();
    }
    
    function renderSavedBills(filter = "") {
        tables.savedBills.innerHTML = "";
        const filteredBills = inventory.savedBills.filter(bill => bill.details.customer.toLowerCase().includes(filter.toLowerCase()) || bill.details.id.toLowerCase().includes(filter.toLowerCase())).reverse();
        filteredBills.forEach(bill => {
            const row = tables.savedBills.insertRow();
            row.insertCell().textContent = bill.details.id;
            row.insertCell().textContent = bill.details.customer;
            row.insertCell().textContent = `₹${bill.details.finalPrice.toFixed(2)}`;
            const actionCell = row.insertCell();
            actionCell.className = "action-cell";
            const viewBtn = document.createElement("button");
            viewBtn.textContent = "View";
            viewBtn.className = "view-btn";
            viewBtn.onclick = () => loadBillIntoCreator(bill);
            actionCell.appendChild(viewBtn);
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "&times;";
            deleteBtn.className = "delete-btn";
            deleteBtn.onclick = () => {
                if (confirm(`Are you sure you want to delete Bill ${bill.details.id}? This cannot be undone.`)) {
                    const originalIndex = inventory.savedBills.findIndex(savedBill => savedBill.details.id === bill.details.id);
                    if (originalIndex > -1) {
                        inventory.savedBills.splice(originalIndex, 1);
                        saveData();
                        renderSavedBills();
                    }
                }
            };
            actionCell.appendChild(deleteBtn);
        });
    }
    
    function setupNewBill() {
        currentInvoice = { items: [], details: {} };
        billCounter++;
        invoiceDetailsFields.customer.value = "";
        invoiceDetailsFields.product.value = "";
        invoiceDetailsFields.notes.value = "";
        summaryFields.discountInput.value = "";
        summaryFields.profitSelect.value = "0.20";
        summaryFields.customProfitInput.style.display = "none";
        summaryFields.expenseSelect.value = "0.10";
        summaryFields.customExpenseInput.style.display = "none";
        invoiceDetailsFields.date.textContent = (new Date).toLocaleDateString();
        invoiceDetailsFields.id.textContent = `BGL-${(new Date).getFullYear()}-${String(billCounter).padStart(3, "0")}`;
        renderInvoice();
    }
    
    function addItemToInvoice() {
        const type = itemAdder.type.value,
            index = itemAdder.item.value,
            quantity = parseFloat(itemAdder.quantity.value);
        if (index === "" || !quantity || quantity <= 0) {
            alert("Please select an item and enter a valid quantity.");
            return;
        }
        let itemData, price, description;
        if (type === "raw-material") {
            itemData = inventory.rawMaterials[index];
            price = itemData.price;
            description = `${itemData.name} (${itemData.unit})`;
        } else if (type === "labor") {
            itemData = inventory.labor[index];
            price = itemData.rate;
            description = `${itemData.name} (Hours)`;
        } else {
            itemData = inventory.packing[index];
            price = itemData.price;
            description = `${itemData.name} (${itemData.unit})`;
        }
        currentInvoice.items.push({ type: type, description: description, quantity: quantity, unitPrice: price, total: quantity * price });
        renderInvoice();
        itemAdder.quantity.value = "";
    }
    
    function calculateSummary() {
        let costs = { raw: 0, wages: 0, packing: 0 };
        currentInvoice.items.forEach(item => {
            if (item.type === "raw-material") costs.raw += item.total;
            if (item.type === "labor") costs.wages += item.total;
            if (item.type === "packing") costs.packing += item.total;
        });
        
        let expensePercent = summaryFields.expenseSelect.value === 'custom' 
            ? (parseFloat(summaryFields.customExpenseInput.value) || 0) / 100
            : parseFloat(summaryFields.expenseSelect.value);
        
        let profitPercent = summaryFields.profitSelect.value === 'custom'
            ? (parseFloat(summaryFields.customProfitInput.value) || 0) / 100
            : parseFloat(summaryFields.profitSelect.value);

        const otherExpenses = costs.raw * expensePercent;
        const subtotal = costs.raw + costs.wages + costs.packing;
        const makingCost = subtotal + otherExpenses;
        const profit = makingCost * profitPercent;
        const discount = parseFloat(summaryFields.discountInput.value) || 0;
        const finalPrice = makingCost + profit - discount;
        
        summaryFields.rawMaterials.textContent = `₹${costs.raw.toFixed(2)}`;
        summaryFields.wages.textContent = `₹${costs.wages.toFixed(2)}`;
        summaryFields.packing.textContent = `₹${costs.packing.toFixed(2)}`;
        summaryFields.subtotal.textContent = `₹${subtotal.toFixed(2)}`;
        summaryFields.otherExpenses.textContent = `₹${otherExpenses.toFixed(2)}`;
        summaryFields.makingCost.textContent = `₹${makingCost.toFixed(2)}`;
        summaryFields.profit.textContent = `₹${profit.toFixed(2)}`;
        summaryFields.finalPrice.textContent = `₹${finalPrice.toFixed(2)}`;
        
        return { costs, subtotal, otherExpenses, makingCost, profit, discount, finalPrice, expensePercent, profitPercent };
    }
    
    function saveCurrentBill() {
        if (currentInvoice.items.length === 0) {
            alert("Cannot save an empty bill. Please add items first.");
            return;
        }
        const summary = calculateSummary();
        const billToSave = {
            items: JSON.parse(JSON.stringify(currentInvoice.items)),
            details: {
                id: invoiceDetailsFields.id.textContent,
                customer: invoiceDetailsFields.customer.value,
                product: invoiceDetailsFields.product.value,
                date: invoiceDetailsFields.date.textContent,
                notes: invoiceDetailsFields.notes.value,
                profitPercentValue: summaryFields.profitSelect.value,
                customProfit: summaryFields.customProfitInput.value,
                expensePercentValue: summaryFields.expenseSelect.value,
                customExpense: summaryFields.customExpenseInput.value,
                discount: summaryFields.discountInput.value,
                ...summary
            }
        };
        const existingBillIndex = inventory.savedBills.findIndex(b => b.details.id === billToSave.details.id);
        if (existingBillIndex > -1) {
            inventory.savedBills[existingBillIndex] = billToSave;
        } else {
            inventory.savedBills.push(billToSave);
        }
        saveData();
        renderSavedBills();
        alert(`Bill ${billToSave.details.id} saved successfully!`);
    }
    
    function loadBillIntoCreator(bill) {
        invoiceDetailsFields.id.textContent = bill.details.id;
        invoiceDetailsFields.customer.value = bill.details.customer;
        invoiceDetailsFields.product.value = bill.details.product;
        invoiceDetailsFields.date.textContent = bill.details.date;
        invoiceDetailsFields.notes.value = bill.details.notes;
        
        summaryFields.expenseSelect.value = bill.details.expensePercentValue || '0.10';
        if (bill.details.expensePercentValue === 'custom') {
            summaryFields.customExpenseInput.style.display = 'block';
            summaryFields.customExpenseInput.value = bill.details.customExpense;
        } else {
            summaryFields.customExpenseInput.style.display = 'none';
        }
        
        summaryFields.profitSelect.value = bill.details.profitPercentValue || '0.20';
        if (bill.details.profitPercentValue === 'custom') {
            summaryFields.customProfitInput.style.display = 'block';
            summaryFields.customProfitInput.value = bill.details.customProfit;
        } else {
            summaryFields.customProfitInput.style.display = 'none';
        }
        
        summaryFields.discountInput.value = bill.details.discount;
        currentInvoice.items = JSON.parse(JSON.stringify(bill.items));
        renderInvoice();
        window.scrollTo(0, 0);
    }
    
    function updateItemAdder() {
        const type = itemAdder.type.value,
            data = inventory[type === "raw-material" ? "rawMaterials" : type];
        itemAdder.item.innerHTML = data.map((item, index) => `<option value="${index}">${item.name}</option>`).join("");
    }
    
    // --- EVENT LISTENERS ---
    forms.rawMaterial.addEventListener("submit", e => {
        e.preventDefault();
        const packQty = parseFloat(document.getElementById("rm-pack-qty").value),
            packCost = parseFloat(document.getElementById("rm-pack-cost").value);
        if (packQty <= 0) {
            alert("Total Quantity in Pack must be greater than zero.");
            return;
        }
        inventory.rawMaterials.push({
            name: document.getElementById("rm-name").value,
            unit: document.getElementById("rm-unit-select").value,
            price: packCost / packQty
        });
        saveData();
        renderInventoryTables();
        forms.rawMaterial.reset();
    });
    forms.labor.addEventListener('submit', (e) => {
        e.preventDefault();
        inventory.labor.push({
            name: document.getElementById('labor-name').value,
            rate: parseFloat(document.getElementById('labor-rate').value)
        });
        saveData();
        renderInventoryTables();
        forms.labor.reset();
    });
    forms.packing.addEventListener('submit', (e) => {
        e.preventDefault();
        inventory.packing.push({
            name: document.getElementById('packing-name').value,
            unit: document.getElementById('packing-unit').value,
            price: parseFloat(document.getElementById('packing-price').value)
        });
        saveData();
        renderInventoryTables();
        forms.packing.reset();
    });
    
    itemAdder.type.addEventListener('change', updateItemAdder);
    itemAdder.button.addEventListener('click', addItemToInvoice);
    summaryFields.discountInput.addEventListener('input', calculateSummary);
    
    summaryFields.expenseSelect.addEventListener('change', (e) => {
        summaryFields.customExpenseInput.style.display = e.target.value === 'custom' ? 'block' : 'none';
        calculateSummary();
    });
    summaryFields.profitSelect.addEventListener('change', (e) => {
        summaryFields.customProfitInput.style.display = e.target.value === 'custom' ? 'block' : 'none';
        calculateSummary();
    });
    summaryFields.customExpenseInput.addEventListener('input', calculateSummary);
    summaryFields.customProfitInput.addEventListener('input', calculateSummary);

    document.getElementById('btn-print-bill').addEventListener('click', () => window.print());
    document.getElementById('btn-save-bill').addEventListener('click', saveCurrentBill);
    document.getElementById('btn-new-bill').addEventListener('click', () => {
        saveData();
        setupNewBill();
    });
    document.getElementById('search-saved-bills').addEventListener('input', (e) => renderSavedBills(e.target.value));
    
    // --- INITIALIZATION ---
    loadData();
    renderAll();
    setupNewBill();
});
