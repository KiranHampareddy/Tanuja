/* --- GOOGLE FONT IMPORT --- */
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

/* --- COLOR & STYLE VARIABLES --- */
:root {
    --primary-color: #007BFF;
    --secondary-color: #0056b3;
    --background-color: #F8F9FA;
    --panel-color: #FFFFFF;
    --text-color: #343A40;
    --heading-color: #212529;
    --border-color: #DEE2E6;
    --success-color: #28A745;
    --danger-color: #DC3545;
    --view-color: #17A2B8;
    --font-family: 'Lato', sans-serif;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    --border-radius: 8px;
}

/* --- GENERAL & LAYOUT STYLES --- */
body {
    font-family: var(--font-family);
    background-color: var(--background-color);
    color: var(--text-color);
    margin: 0;
    font-size: 16px;
}
header {
    background: var(--primary-color);
    color: white;
    padding: 1.25rem;
    text-align: center;
    border-bottom: 4px solid var(--secondary-color);
}
.container {
    display: flex;
    padding: 1.5rem;
    gap: 1.5rem;
}
.inventory-panel, .billing-panel {
    background-color: var(--panel-color);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
}
.inventory-panel {
    flex: 2;
    display: flex;
    flex-direction: column;
}
.billing-panel {
    flex: 3;
}
h1, h2, h3 {
    color: var(--heading-color);
}
h2 {
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 0.75rem;
    margin-bottom: 1.5rem;
}
h3 {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
}
.inventory-section {
    margin-bottom: 2rem;
}

/* --- FORMS & INPUTS --- */
form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
    align-items: center;
}
form button {
    grid-column: 1 / -1;
    background-color: var(--secondary-color);
    color: white;
}
input[type="text"], input[type="number"], select, textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    font-family: inherit;
    font-size: 0.95rem;
    transition: border-color 0.2s, box-shadow 0.2s;
}
input[type="text"]:focus, input[type="number"]:focus, select:focus, textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
}
textarea {
    resize: vertical;
}

/* --- CUSTOM INPUT WRAPPER --- */
.custom-input-wrapper {
    display: flex;
    gap: 10px;
}
.custom-input {
    display: none;
}

/* --- BUTTONS --- */
button {
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-weight: 700;
    padding: 12px 18px;
    transition: transform 0.2s, box-shadow 0.2s;
}
button:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow);
}
.primary-action {
    background-color: var(--primary-color);
    color: white;
    width: 48%;
    font-size: 1rem;
}
.secondary-action {
    background: none;
    border: 2px solid var(--border-color);
    color: var(--text-color);
    width: 100%;
}
#btn-add-item {
    background-color: var(--success-color);
    color: white;
}
.view-btn {
    background-color: var(--view-color);
    color: white;
    padding: 6px 10px;
    font-size: 0.85rem;
}
.delete-btn {
    background-color: var(--danger-color);
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    text-align: center;
    padding: 0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.delete-btn:hover {
    transform: translateY(-2px) scale(1.1);
}

/* --- TABLES --- */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}
.table-wrapper {
    overflow-x: auto;
}
th, td {
    border-bottom: 1px solid var(--border-color);
    padding: 12px;
    text-align: left;
}
th {
    background-color: #F8F9FA;
    color: var(--heading-color);
    font-weight: 700;
    font-size: 0.9rem;
}
tbody tr:hover {
    background-color: #F1F3F5;
}

/* --- INVOICE SPECIFIC STYLES --- */
.invoice-header, .invoice-item-adder {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.25rem;
    margin-bottom: 1.5rem;
    align-items: center;
}
.full-width {
    grid-column: 1 / -1;
}
.invoice-actions {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}
.new-bill-wrapper {
    margin-top: 1rem;
    border-top: 1px dashed var(--border-color);
    padding-top: 1rem;
}
.summary-grid {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem 2rem;
    font-size: 1rem;
    align-items: center;
}
.summary-grid span, .summary-grid label {
    text-align: left;
    font-weight: 400;
}
.summary-grid span:nth-child(even), #summary-making-cost, #summary-final-price {
    text-align: right;
    font-weight: 700;
}
.total-label {
    grid-column: 1;
    font-weight: 700 !important;
}
.final-total {
    font-size: 1.5rem;
    color: var(--primary-color);
}
hr {
    grid-column: 1 / -1;
    border: none;
    border-top: 1px solid var(--border-color);
}

/* --- SAVED BILLS SECTION --- */
.saved-bills-section {
    border-top: 3px solid var(--border-color);
    margin-top: 2rem;
    padding-top: 1rem;
}
.saved-bills-section table {
    table-layout: fixed;
}
.saved-bills-section td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.saved-bills-section .action-cell {
    display: flex;
    gap: 8px;
}


/* --- RESPONSIVE & PRINT --- */
@media (max-width: 1200px) {
    .inventory-panel { flex: 1; }
    .billing-panel { flex: 2; }
}
@media (max-width: 900px) {
    .container { flex-direction: column; }
    .invoice-item-adder { grid-template-columns: 1fr; }
    .primary-action { width: 100%; margin-bottom: 10px; }
    .invoice-actions { flex-direction: column; }
}
@media print {
    body { background-color: #fff; }
    .container { flex-direction: column; padding: 0; }
    .inventory-panel, .invoice-item-adder, .invoice-actions, .delete-btn, header, form button, .new-bill-wrapper, .view-btn, #profit-percentage-select, #discount-input, label { display: none; }
    .billing-panel { box-shadow: none; width: 100%; }
    .summary-grid label.total-label { display: block; }
}
