export default async function selecionarFunil(statusFunil) {
    const options = Array.from(document.getElementById('funil').options);

    for (const option of options) {
        if (option.value == statusFunil) {
            option.selected = true;
            break; // Saia do loop após encontrar a opção desejada
        }
    }
}