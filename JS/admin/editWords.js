/* ── State ── */
let allWords     = [];
let displayWords = [];
let isSearching  = false;

/* ── Load words on page load ── */
document.addEventListener('DOMContentLoaded', function () {
    loadAllWords();
});

/* load all words from DB */
function loadAllWords() {
    fetch("./api/admin/getAllWords.php", { method: "GET" })
    .then(res => res.json())
    .then(words => {
        allWords     = words;
        displayWords = words.slice(0, 5);
        isSearching  = false;
        renderTable();
    })
    .catch(function () {
        document.getElementById("message").innerText = "Could not load words.";
    });
}

/* render table */
function renderTable() {
    let tbody = document.getElementById('wordTableBody');

    if (displayWords.length === 0) {
        let msg = isSearching ? 'Word not found in the database.' : 'No words yet.';
        tbody.innerHTML = '<tr class="empty-row"><td colspan="3">' + msg + '</td></tr>';
        return;
    }

    let rows = '';
    for (let i = 0; i < displayWords.length; i++) {
        let w = displayWords[i];
        rows += '<tr id="row-' + w.id + '">'
            + '<td>' + (i + 1) + '</td>'
            + '<td id="cell-' + w.id + '">' + escapeHtml(w.word_name) + '</td>'
            + '<td>'
            +   '<div class="actions">'
            +     '<button onclick="startEdit(' + w.id + ', \'' + escapeAttr(w.word_name) + '\')">Edit</button>'
            +   '</div>'
            + '</td>'
            + '</tr>';
    }
    tbody.innerHTML = rows;
}

/* search */
function searchWord() {
    let query = document.getElementById('searchInput').value.trim().toLowerCase();

    if (query === '') {
        document.getElementById("message").innerText = "Please type a word to search.";
        return;
    }

    isSearching  = true;
    displayWords = allWords.filter(function (w) {
        return w.word_name.toLowerCase().indexOf(query) !== -1;
    });

    renderTable();

    if (displayWords.length === 0) {
        document.getElementById("message").innerText = "Word not found in the database.";
    }
}

/* clear search */
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById("message").innerText = '';
    isSearching  = false;
    displayWords = allWords.slice(0, 5);
    renderTable();
}

/* start inline edit */
function startEdit(id, currentWord) {
    let row  = document.getElementById('row-' + id);
    let cell = document.getElementById('cell-' + id);

    row.classList.add('editing');

    // replace word with input
    cell.innerHTML = '<input class="edit-input" id="edit-' + id + '" value="' + escapeAttr(currentWord) + '">';

    // replace Edit button with Save / Cancel
    let actionsDiv = row.querySelector('.actions');
    actionsDiv.innerHTML =
        '<button class="editWordBtn" onclick="updateWord(' + id + ')">Save</button>' +
        '<button class="deleteWordBtn" onclick="cancelEdit(' + id + ', \'' + escapeAttr(currentWord) + '\')">Cancel</button>';

    document.getElementById('edit-' + id).focus();
}

/* cancel edit */
function cancelEdit(id, originalWord) {
    let row  = document.getElementById('row-' + id);
    let cell = document.getElementById('cell-' + id);

    row.classList.remove('editing');
    cell.textContent = originalWord;

    let actionsDiv = row.querySelector('.actions');
    actionsDiv.innerHTML =
        '<button class="editWordBtn" onclick="startEdit(' + id + ', \'' + escapeAttr(originalWord) + '\')">Edit</button>';
}

/* save edited word */
function updateWord(id) {
    let input   = document.getElementById('edit-' + id);
    let newWord = input.value.trim();

    if (!newWord) {
        document.getElementById("message").innerText = "Word cannot be empty.";
        return;
    }

    fetch("./api/admin/editGameWords.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, word: newWord })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("message").innerText = data.message;

        let row  = document.getElementById('row-' + id);
        let cell = document.getElementById('cell-' + id);

        row.classList.remove('editing');

        // show Saved badge for 2.5s then just show the word
        cell.innerHTML = escapeHtml(newWord) + ' <span style="font-size:11px; background:#EAF3DE; color:#3B6D11; padding:2px 8px; border-radius:6px;">Saved</span>';
        setTimeout(function () { cell.textContent = newWord; }, 2500);

        // restore Edit button
        let actionsDiv = row.querySelector('.actions');
        actionsDiv.innerHTML =
            '<button class="editWordBtn" onclick="startEdit(' + id + ', \'' + escapeAttr(newWord) + '\')">Edit</button>';

        // update local arrays
        for (let i = 0; i < allWords.length; i++) {
            if (allWords[i].id === id) { allWords[i].word_name = newWord; break; }
        }
        for (let j = 0; j < displayWords.length; j++) {
            if (displayWords[j].id === id) { displayWords[j].word_name = newWord; break; }
        }
    })
    .catch(function () {
        document.getElementById("message").innerText = "Failed to save word.";
    });
}

/* helpers */
function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
    return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}
