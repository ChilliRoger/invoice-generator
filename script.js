let currentTemplate = 'disbursement';
let currentTable = null;

const templates = {
    disbursement: {
        title: 'FINAL DISBURSEMENT ACCOUNT',
        subtitle: 'MT. TELESTO<br>SIKKA PORT CALL',
        reference: 'FDA REF NO : OMS/07/25-26',
        defaultColumns: ['S.No', 'Invoice No', 'Invoice Date', 'Particulars', 'Amount', 'Amount in USD', 'Tax Rate', 'Tax Amount', 'Remarks', 'Status'],
        columnClasses: ['col-sno', 'col-invoice', 'col-date', 'col-description', 'col-amount', 'col-usd', 'col-rate', 'col-amount', 'col-remarks', 'col-generic'],
        amountColumns: [4, 5, 7], // 0-indexed positions of amount columns for calculation
        sampleData: [
            ['1', 'OMS/07-01/25-26', '16/04/2025', 'Crew Handling Expenses Origners/Offsigners with additional administrative processing', '177000', '2082.35', '18', '31860', 'Standard', 'Active'],
            ['2', 'OMS/07-02/25-26', '16/04/2025', 'Crew Handling Exp. Technician Disembarkation (3 Technicians Onboard) including documentation and clearance procedures', '31860', '374.82', '18', '5734.8', 'Processing', 'Active'],
            ['3', 'OMS/07-03/25-26', '16/04/2025', 'Crew Handling Exp. Superintendent Disembarkation (1 Supdt. Onboard)', '18880', '222.12', '18', '3398.4', 'Standard', ' brilliant'],
            ['4', 'OMS/07-04/25-26', '16/04/2025', 'Crew Handling Exp. Technician Attendance (HM - 2 and Wingeers - 7) for extended maintenance operations', '306800', '3609.41', '18', '55224', 'Extended', 'Active'],
            ['5', 'OMS/07-05/25-26', '16/04/2025', 'Crew Handling Exp. Superintendent Embarkation / Disembarkation', '56640', '666.35', '18', '10195.2', 'Standard', 'Active'],
            ['6', 'OMS/07-06/25-26', '16/04/2025', 'Crew Handling Exp. Surveyor Attendance (CAP Surveyors)', '61360', '721.88', '18', '11044.8', 'Survey', 'Active'],
            ['7', 'OMS/07-07/25-26', '16/04/2025', 'Crew Handling Exp. MEDSCAN - (1 Person D&A Test)', '14160', '166.59', '18', '2548.8', 'Medical', 'Active']
        ],
        showTotals: true
    },
    invoice: {
        title: 'INVOICE STATEMENT',
        subtitle: 'COMMERCIAL INVOICE<br>SHIPPING SERVICES',
        reference: 'INV REF NO : OMS/INV/25-26',
        defaultColumns: ['Item No', 'Description', 'Quantity', 'Unit Price', 'Total Amount', 'Tax Rate', 'Tax Amount', 'Net Amount', 'Remarks', 'Category'],
        columnClasses: ['col-sno', 'col-description', 'col-qty', 'col-rate', 'col-amount', 'col-rate', 'col-amount', 'col-amount', 'col-remarks', 'col-generic'],
        amountColumns: [4, 6, 7], // 0-indexed positions of amount columns for calculation
        sampleData: [
            ['1', 'Port Handling Charges including crane operations and loading/unloading services', '1', '50000', '50000', '18', '9000', '59000', 'Standard Rate', 'Handling'],
            ['2', 'Documentation Fee for customs and regulatory compliance', '1', '15000', '15000', '18', '2700', '17700', 'Processing', 'Documentation'],
            ['3', 'Customs Clearance with expedited processing and documentation', '1', '25000', '25000', '18', '4500', '29500', 'Import/Export', 'Customs'],
            ['4', 'Storage Charges for warehouse facilities and security', '5', '2000', '10000', '18', '1800', '11800', 'Per Day', 'Storage'],
            ['5', 'Transportation services including loading and delivery', '1', '30000', '30000', '18', '5400', '35400', 'To/From Port', 'Transport'],
            ['6', 'Insurance Premium for comprehensive cargo coverage', '1', '8000', '8000', '18', '1440', '9440', 'Cargo Insurance', 'Insurance'],
            ['7', 'Miscellaneous Charges for additional services and handling', '1', '5000', '5000', '18', '900', '5900', 'Other Services', 'Misc']
        ],
        showTotals: true
    },
    manifest: {
        title: 'CARGO MANIFEST',
        subtitle: 'VESSEL CARGO DETAILS<br>IMPORT/EXPORT MANIFEST',
        reference: 'MAN REF NO : OMS/MAN/25-26',
        defaultColumns: ['Container No', 'Cargo Description', 'Weight (KG)', 'Volume (CBM)', 'Origin', 'Destination', 'Status', 'Handler', 'Cost', 'Remarks'],
        columnClasses: ['col-invoice', 'col-description', 'col-amount', 'col-amount', 'col-description', 'col-description', 'col-generic', 'col-generic', 'col-amount', 'col-remarks'],
        amountColumns: [8], // 0-indexed positions of amount columns for calculation
        sampleData: [
            ['MSKU-1234567', 'Electronic Goods including smartphones, laptops, tablets and accessories', '15000', '45.5', 'Shanghai, China', 'Chennai, India', 'In Transit', 'Handler A', '125000', 'Priority'],
            ['TCLU-2345678', 'Textile Materials including cotton fabrics, synthetic materials and garments', '20000', '38.2', 'Mumbai, India', 'Hamburg, Germany', 'Loaded', 'Handler B', '98000', 'Standard'],
            ['GESU-3456789', 'Automotive Parts including engines, transmissions and electronic components', '18500', '52.1', 'Tokyo, Japan', 'Los Angeles, USA', 'Discharged', 'Handler C', '156000', 'Fragile'],
            ['OOLU-4567890', 'Food Products including processed foods, beverages and packaged goods', '12000', '28.7', 'Bangkok, Thailand', 'Dubai, UAE', 'Loading', 'Handler A', '87000', 'Perishable'],
            ['COSCO-567891', 'Chemicals including industrial solvents, cleaning agents and raw materials', '25000', '67.3', 'Singapore', 'Rotterdam, Netherlands', 'In Transit', 'Handler D', '198000', 'Hazardous'],
            ['EVERGI-67892', 'Machinery including construction equipment, manufacturing tools and spare parts', '30000', '89.4', 'Busan, South Korea', 'Felixstowe, UK', 'Arrived', 'Handler B', '245000', 'Heavy'],
            ['HAPAG-78903', 'Raw Materials including steel, aluminum, copper and other metals', '22000', '41.8', 'Colombo, Sri Lanka', 'Jeddah, Saudi Arabia', 'Departed', 'Handler C', '134000', 'Bulk']
        ],
        showTotals: true
    }
};

function selectTemplate(templateType) {
    currentTemplate = templateType;
    
    // Update button states
    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update default column count based on template
    const template = templates[currentTemplate];
    document.getElementById('columns').value = template.defaultColumns.length;
    
    // Clear existing table
    document.getElementById('templateContent').innerHTML = '';
    document.getElementById('clearBtn').disabled = true;
    document.getElementById('sampleBtn').disabled = true;
    document.getElementById('calcBtn').disabled = true;
    document.getElementById('printBtn').disabled = true;
}

function generateTable() {
    const rows = Number(document.getElementById('rows').value);
    const cols = Number(document.getElementById('columns').value);
    const template = templates[currentTemplate];
    
    if (rows < 1 || rows > 50) {
        alert('Please enter valid number of rows (1-50)');
        return;
    }
    
    if (cols < 1 || cols > 10) {
        alert('Please enter valid number of columns (1-10)');
        return;
    }
    
    const templateContent = document.getElementById('templateContent');
    
    // Generate column headers - use default template columns if available, otherwise generic headers
    let columnHeaders = [];
    let columnClasses = [];
    if (template.defaultColumns && cols <= template.defaultColumns.length) {
        columnHeaders = template.defaultColumns.slice(0, cols);
        columnClasses = template.columnClasses ? template.columnClasses.slice(0, cols) : [];
    } else {
        for (let i = 0; i < cols; i++) {
            if (template.defaultColumns && i < template.defaultColumns.length) {
                columnHeaders.push(template.defaultColumns[i]);
                if (template.columnClasses && i < template.columnClasses.length) {
                    columnClasses.push(template.columnClasses[i]);
                } else {
                    columnClasses.push('');
                }
            } else {
                columnHeaders.push(`Column ${i + 1}`);
                columnClasses.push('col-generic');
            }
        }
    }
    
    // Generate document structure
    let html = `
        <div class="document">
            <div class="company-header">
                OCEAN MASTERS SHIPPING PRIVATE LIMITED
            </div>
            
            <div class="company-details">
                368/2, 10th Street, Toovipuram, Thoothukudi - 628002, Tamilnadu.<br>
                GSTIN : 33AADCO9791L1ZT<br>
                0461 - 2300577, 74487 03777, 74487 04777, 74487 05777<br>
                agency@omsindia.in, operations@omsindia.in<br>
                www.omsindia.in
            </div>
            
            <div class="document-title">
                <h3>${template.title}</h3>
                <p>${template.subtitle}</p>
            </div>
            
            <div class="document-info">
                <div class="info-section">
                    ${template.reference}<br>
                    <br>
                    M/s. <input type="text" value="Bluewave Maritime" style="width: 150px;"><br>
                    <input type="text" value="Capeseas Shipping LLC Fz" style="width: 200px;"><br>
                    <input type="text" value="Business Center 1, M Floor," style="width: 200px;"><br>
                    <input type="text" value="The Meydan Hotel" style="width: 150px;"><br>
                    <input type="text" value="Nad Al Sheba, Dubai, UAE" style="width: 200px;">
                </div>
                <div class="info-section" style="text-align: right;">
                    Date: <input type="date" value="2025-04-16"><br>
                    ${template.showTotals ? '<div style="display: flex; justify-content: flex-end; margin-top: 5px;">Exchange Rate: <input type="text" value="85.00" style="width: 60px; margin-left: 5px;" id="exchangeRate"></div>' : ''}
                </div>
            </div>
            
            <table class="data-table" id="mainTable">
                <colgroup>
                    ${columnClasses.map(cls => `<col class="${cls}">`).join('')}
                </colgroup>
                <thead>
                    <tr>
                        ${columnHeaders.map((col, index) => `<th class="${columnClasses[index]}"><textarea class="header-input" placeholder="${col}">${col}</textarea></th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${generateTableRows(rows, cols, columnClasses)}
                </tbody>
            </table>
            
            ${template.showTotals ? generateTotalsSection() : ''}
        </div>
    `;
    
    templateContent.innerHTML = html;
    
    currentTable = { rows, cols, template: currentTemplate };
    
    // Add auto-resize functionality to all textareas (including headers)
    addAutoResizeFunctionality();
    
    // Add real-time calculation when totals are manually edited
    addTotalsEventListeners();
    
    // Enable buttons
    document.getElementById('clearBtn').disabled = false;
    document.getElementById('sampleBtn').disabled = false;
    document.getElementById('calcBtn').disabled = false;
    document.getElementById('printBtn').disabled = false;
}

function generateTableRows(rows, cols, columnClasses) {
    let html = '';
    for (let i = 0; i < rows; i++) {
        html += '<tr>';
        for (let j = 0; j < cols; j++) {
            const isDescriptionColumn = columnClasses[j] === 'col-description';
            const cellClass = isDescriptionColumn ? 'description-cell' : '';
            const inputClass = isDescriptionColumn ? 'cell-input description-input' : 'cell-input';
            html += `<td class="${cellClass}"><textarea class="${inputClass}" placeholder="" rows="1"></textarea></td>`;
        }
        html += '</tr>';
    }
    return html;
}

function generateTotalsSection() {
    return `
        <div class="totals-section">
            <div style="margin-bottom: 5px;">
                Sub Total: <input type="text" id="subTotal" value="" placeholder="0.00" style="width: 100px;">
                  USD: <input type="text" id="subTotalUSD" value="" placeholder="0.00" style="width: 100px;">
            </div>
            <div style="margin-bottom: 5px;">
                Tax/GST: <input type="text" id="taxAmount" value="" placeholder="0.00" style="width: 100px;">
                  USD: <input type="text" id="taxAmountUSD" value="" placeholder="0.00" style="width: 100px;">
            </div>
            <div class="manual-edit-hint">
                * All totals are editable. Use "Auto-Calculate Totals" button to compute automatically.
            </div>
            
            <!-- Enhanced totals section with additional rows -->
            <table class="data-table totals-table" style="margin-top: 10px; border-top: 2px solid #333;">
                <tr>
                    <td colspan="2" style="text-align: center; font-weight: bold; padding: 8px;">Total Charges</td>
                    <td style="text-align: right; padding: 8px;"><input type="text" id="grandTotal" value="" placeholder="0.00" style="width: 100px; text-align: right;"></td>
                    <td style="text-align: right; padding: 8px;"><input type="text" id="grandTotalUSD" value="" placeholder="0.00" style="width: 100px; text-align: right; padding-right: 5px;" readonly></td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: center; padding: 8px;">Advance received against PDA</td>
                    <td style="text-align: right; padding: 8px;"><input type="text" id="advanceReceived" value="-" style="width: 100px; text-align: right;"></td>
                    <td style="text-align: right; padding: 8px;"><input type="text" id="advanceReceivedUSD" value="-" style="width: 100px; text-align: right; padding-right: 5px;"></td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: center; padding: 8px;">Balance in Our Favour</td>
                    <td style="text-align: right; padding: 8px;"><input type="text" id="balanceInFavor" value="" placeholder="0.00" style="width: 100px; text-align: right;" oninput="updateAmountInWords()"></td>
                    <td style="text-align: right; padding: 8px;"><input type="text" id="balanceInFavorUSD" value="" placeholder="0.00" style="width: 100px; text-align: right; padding-right: 5px;" oninput="updateAmountInWords()"></td>
                </tr>
            </table>
            
            <!-- Amount in words section - modified to show NIL by default -->
            <div class="amount-in-words" style="text-align: left; padding-left: 0;">
                <div style="font-weight: bold; margin-top: 10px; text-align: left;">BALANCE IN OUR FAVOR: <span id="inrInWords">NIL</span></div>
                <div style="font-weight: bold; margin-bottom: 15px; text-align: left;">BALANCE IN OUR FAVOR: <span id="usdInWords">NIL</span></div>
            </div>
            
            <!-- Bank account details section -->
            <div class="bank-details">
                <div style="font-weight: bold; text-decoration: underline; margin-top: 15px;">Our Bank Account Details</div>
                <table style="width: 100%; margin-top: 5px; border: none;">
                    <tr>
                        <td style="border: none; text-align: left; padding: 2px; width: 50%;">Account Name : OCEAN MASTERS SHIPPING PRIVATE LIMITED</td>
                        <td style="border: none; text-align: right; padding: 2px; width: 50%;">FOR OCEAN MASTERS SHIPPING PRIVATE LIMITED</td>
                    </tr>
                    <tr>
                        <td style="border: none; text-align: left; padding: 2px;">Bank Name : AXIS BANK</td>
                        <td style="border: none; text-align: right; padding: 2px;" rowspan="4">
                            <!-- Replace this image with your new signature -->
                            <img src="" style="width: 200px; margin-bottom: 1px;">
                            <div>AUTHORISED SIGNATORY</div>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: none; text-align: left; padding: 2px;">Account Number : 923020017320449</td>
                    </tr>
                    <tr>
                        <td style="border: none; text-align: left; padding: 2px;">IFSC : UTIB0000105</td>
                    </tr>
                    <tr>
                        <td style="border: none; text-align: left; padding: 2px;">Swift Code : AXISINBB105</td>
                    </tr>
                </table>
            </div>
        </div>
    `;
}

function addAutoResizeFunctionality() {
    // Include both cell inputs and header inputs
    const textareas = document.querySelectorAll('.cell-input, .header-input');
    
    textareas.forEach(textarea => {
        // Auto-resize function
        function autoResize() {
            textarea.style.height = 'auto';
            textarea.style.height = Math.max(16, textarea.scrollHeight) + 'px';
        }
        
        // Add event listeners
        textarea.addEventListener('input', autoResize);
        textarea.addEventListener('paste', () => setTimeout(autoResize, 10));
        
        // Initial resize
        autoResize();
    });
}

function addTotalsEventListeners() {
    const totalInputs = ['subTotal', 'subTotalUSD', 'taxAmount', 'taxAmountUSD', 'grandTotal', 'grandTotalUSD'];
    
    totalInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            // Allow manual editing
            input.addEventListener('input', function() {
                // Optional: Auto-calculate related fields when one is changed
                if (inputId === 'subTotal') {
                    updateUSDFromINR('subTotal', 'subTotalUSD');
                } else if (inputId === 'subTotalUSD') {
                    updateINRFromUSD('subTotalUSD', 'subTotal');
                } else if (inputId === 'taxAmount') {
                    updateUSDFromINR('taxAmount', 'taxAmountUSD');
                } else if (inputId === 'taxAmountUSD') {
                    updateINRFromUSD('taxAmountUSD', 'taxAmount');
                } else if (inputId === 'grandTotal') {
                    updateUSDFromINR('grandTotal', 'grandTotalUSD');
                } else if (inputId === 'grandTotalUSD') {
                    updateINRFromUSD('grandTotalUSD', 'grandTotal');
                }
                
                // Update grand total when sub total or tax changes
                updateGrandTotal();
            });
            
            // Format numbers on blur
            input.addEventListener('blur', function() {
                const value = parseFloat(this.value.replace(/,/g, ''));
                if (!isNaN(value)) {
                    this.value = formatNumber(value);
                }
            });
        }
    });
}

function updateUSDFromINR(inrInputId, usdInputId) {
    const exchangeRateInput = document.getElementById('exchangeRate');
    const exchangeRate = parseFloat(exchangeRateInput ? exchangeRateInput.value : 85);
    const inrValue = parseFloat(document.getElementById(inrInputId).value.replace(/,/g, '') || 0);
    const usdValue = inrValue / exchangeRate;
    document.getElementById(usdInputId).value = formatNumber(usdValue);
}

function updateINRFromUSD(usdInputId, inrInputId) {
    const exchangeRateInput = document.getElementById('exchangeRate');
    const exchangeRate = parseFloat(exchangeRateInput ? exchangeRateInput.value : 85);
    const usdValue = parseFloat(document.getElementById(usdInputId).value.replace(/,/g, '') || 0);
    const inrValue = usdValue * exchangeRate;
    document.getElementById(inrInputId).value = formatNumber(inrValue);
}

function updateGrandTotal() {
    const subTotal = parseFloat(document.getElementById('subTotal').value.replace(/,/g, '') || 0);
    const taxAmount = parseFloat(document.getElementById('taxAmount').value.replace(/,/g, '') || 0);
    const grandTotal = subTotal + taxAmount;
    
    document.getElementById('grandTotal').value = formatNumber(grandTotal);
    
    const exchangeRateInput = document.getElementById('exchangeRate');
    const exchangeRate = parseFloat(exchangeRateInput ? exchangeRateInput.value : 85);
    document.getElementById('grandTotalUSD').value = formatNumber(grandTotal / exchangeRate);
}

function fillSampleData() {
    if (!currentTable) return;
    
    const template = templates[currentTemplate];
    const textareas = document.querySelectorAll('#mainTable tbody .cell-input');
    
    // Fill sample data
    template.sampleData.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const textareaIndex = rowIndex * currentTable.cols + colIndex;
            if (textareas[textareaIndex] && colIndex < currentTable.cols) {
                textareas[textareaIndex].value = cell;
                // Trigger auto-resize
                textareas[textareaIndex].style.height = 'auto';
                textareas[textareaIndex].style.height = Math.max(16, textareas[textareaIndex].scrollHeight) + 'px';
            }
        });
    });
}

function calculateTotals() {
    if (!currentTable) return;
    
    const template = templates[currentTemplate];
    if (!template.showTotals || !template.amountColumns) return;
    
    const textareas = document.querySelectorAll('#mainTable tbody .cell-input');
    const exchangeRateInput = document.getElementById('exchangeRate');
    const exchangeRate = parseFloat(exchangeRateInput ? exchangeRateInput.value : 85);
    
    let subTotal = 0;
    let taxTotal = 0;
    
    // Calculate subtotal from specified amount columns
    for (let rowIndex = 0; rowIndex < currentTable.rows; rowIndex++) {
        for (let colIndex of template.amountColumns) {
            const textareaIndex = rowIndex * currentTable.cols + colIndex;
            if (textareas[textareaIndex]) {
                const value = parseFloat(textareas[textareaIndex].value.replace(/,/g, '') || 0);
                if (colIndex === template.amountColumns[0]) { // Main amount column
                    subTotal += value;
                } else if (colIndex === template.amountColumns[2] && template.amountColumns.length > 2) { // Tax amount column
                    taxTotal += value;
                }
            }
        }
    }
    
    // If no tax column specified, calculate tax as 18% of subtotal
    if (template.amountColumns.length <= 2) {
        taxTotal = subTotal * 0.18;
    }
    
    const grandTotal = subTotal + taxTotal;
    
    // Update totals section
    const subTotalInput = document.getElementById('subTotal');
    const subTotalUSDInput = document.getElementById('subTotalUSD');
    const taxAmountInput = document.getElementById('taxAmount');
    const taxAmountUSDInput = document.getElementById('taxAmountUSD');
    const grandTotalInput = document.getElementById('grandTotal');
    const grandTotalUSDInput = document.getElementById('grandTotalUSD');
    const balanceInFavorInput = document.getElementById('balanceInFavor');
    const balanceInFavorUSDInput = document.getElementById('balanceInFavorUSD');
    
    if (subTotalInput) {
        subTotalInput.value = formatNumber(subTotal);
        subTotalUSDInput.value = formatNumber(subTotal / exchangeRate);
        taxAmountInput.value = formatNumber(taxTotal);
        taxAmountUSDInput.value = formatNumber(taxTotal / exchangeRate);
        grandTotalInput.value = formatNumber(grandTotal);
        grandTotalUSDInput.value = formatNumber(grandTotal / exchangeRate);
        
        // Update balance in favor (same as grand total if no advance payment)
        balanceInFavorInput.value = formatNumber(grandTotal);
        balanceInFavorUSDInput.value = formatNumber(grandTotal / exchangeRate);
        
        // Call updateAmountInWords to refresh the text
        updateAmountInWords();
    }
}

function formatNumber(num) {
    return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
}

function clearTable() {
    if (confirm('Are you sure you want to clear the table?')) {
        document.getElementById('templateContent').innerHTML = '';
        document.getElementById('clearBtn').disabled = true;
        document.getElementById('sampleBtn').disabled = true;
        document.getElementById('calcBtn').disabled = true;
        document.getElementById('printBtn').disabled = true;
        currentTable = null;
    }
}

function printDocument() {
    if (!currentTable) {
        alert('Please generate a table first');
        return;
    }
    
    window.print();
}

// Keyboard shortcut for printing
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        if (currentTable) {
            e.preventDefault();
            printDocument();
        }
    }
});

// Initialize
window.addEventListener('load', function() {
    selectTemplate('disbursement');
});

// Update the updateAmountInWords function to handle zero values
function updateAmountInWords() {
    const balanceInFavor = parseFloat(document.getElementById('balanceInFavor').value.replace(/,/g, '') || 0);
    const balanceInFavorUSD = parseFloat(document.getElementById('balanceInFavorUSD').value.replace(/,/g, '') || 0);
    
    // Update the INR amount in words
    const inrInWords = document.getElementById('inrInWords');
    if (inrInWords) {
        // Set to NIL if amount is 0 or empty
        if (balanceInFavor === 0 || document.getElementById('balanceInFavor').value === '') {
            inrInWords.innerText = 'NIL';
        } else {
            inrInWords.innerText = `RUPEES ${convertToWords(balanceInFavor)} ONLY`;
        }
    }
    
    // Update the USD amount in words
    const usdInWords = document.getElementById('usdInWords');
    if (usdInWords) {
        // Set to NIL if amount is 0 or empty
        if (balanceInFavorUSD === 0 || document.getElementById('balanceInFavorUSD').value === '') {
            usdInWords.innerText = 'NIL';
        } else {
            usdInWords.innerText = `USD ${convertToWords(balanceInFavorUSD)} ONLY`;
        }
    }
}

function convertToWords(amount) {
    // Handle decimal part
    const parts = amount.toFixed(2).toString().split('.');
    const wholePart = parseInt(parts[0]);
    const decimalPart = parseInt(parts[1]);
    
    // Convert whole part to words
    const wholeWords = numberToWords(wholePart);
    
    // For USD, format with "AND CENTS"
    if (document.getElementById('balanceInFavorUSD') && 
        amount === parseFloat(document.getElementById('balanceInFavorUSD').value.replace(/,/g, '') || 0)) {
        if (decimalPart > 0) {
            return `${wholeWords} AND CENTS ${numberToWords(decimalPart)}`;
        } else {
            return wholeWords;
        }
    } 
    // For INR, just whole number words
    else {
        return wholeWords;
    }
}

function numberToWords(num) {
    const ones = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];
    const tens = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];
    
    if (num === 0) return 'ZERO';
    
    // For Indian numbering system (lakhs, crores)
    if (num <= 99) {
        if (num < 20) return ones[num];
        return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
    } else if (num <= 999) {
        return ones[Math.floor(num / 100)] + ' HUNDRED' + (num % 100 ? ' AND ' + numberToWords(num % 100) : '');
    } else if (num <= 99999) {
        return numberToWords(Math.floor(num / 1000)) + ' THOUSAND' + (num % 1000 ? ' ' + numberToWords(num % 1000) : '');
    } else if (num <= 9999999) {
        return numberToWords(Math.floor(num / 100000)) + ' LAKHS' + (num % 100000 ? ' ' + numberToWords(num % 100000) : '');
    } else {
        return numberToWords(Math.floor(num / 10000000)) + ' CRORES' + (num % 10000000 ? ' ' + numberToWords(num % 10000000) : '');
    }
}
