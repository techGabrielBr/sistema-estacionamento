(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    const patio = {
        ler: () => {
            return localStorage.getItem('patio') ?
                JSON.parse(localStorage.getItem('patio')) : [];
        },
        salvar: (veiculos) => {
            localStorage.setItem('patio', JSON.stringify(veiculos));
        },
        render: () => {
            const patioVeiculos = $('#patio-veiculos');
            patioVeiculos.innerHTML = '';
            const veiculos = patio.ler();
            if (veiculos.length) {
                veiculos.forEach(veiculo => {
                    patio.registrar(veiculo);
                });
            }
        },
        registrar: (veiculo, salva) => {
            var _a;
            const patioVeiculos = $('#patio-veiculos');
            const row = document.createElement('tr');
            row.innerHTML = `
                <tr>
                    <td>${veiculo.modelo}</td>
                    <td>${veiculo.placa}</td>
                    <td>${new Date(veiculo.entrada).toLocaleString()}</td>
                    <td>
                        <button id="btn-remover" data-placa=${veiculo.placa}>Remover</button>
                    </td>
                </tr>
            `;
            patioVeiculos === null || patioVeiculos === void 0 ? void 0 : patioVeiculos.appendChild(row);
            (_a = row.querySelector('#btn-remover')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                patio.remover(this.dataset.placa);
            });
            if (salva) {
                patio.salvar([...patio.ler(), veiculo]);
            }
        },
        remover: (dataPlaca) => {
            var _a;
            const diferencaDatas = (new Date().getTime() - new Date((_a = patio.ler()
                .find(veiculo => veiculo.placa === dataPlaca)) === null || _a === void 0 ? void 0 : _a.entrada).getTime());
            const minutos = Math.floor(diferencaDatas / 1000 / 60);
            if (confirm(`Deseja remover o veículo com placa ${dataPlaca}?
            \nTempo de permanência: ${minutos}min
            \nValor a ser pago: R$${minutos * 0.50}`)) {
                patio.salvar(patio.ler().filter(veiculo => veiculo.placa !== dataPlaca));
                patio.render();
            }
        }
    };
    patio.render();
    (_a = $('#btn-cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        const modeloVeiculo = $('#modelo-veiculo');
        const placaVeiculo = $('#placa-veiculo');
        const modelo = modeloVeiculo.value.trim();
        const placa = placaVeiculo.value.trim();
        if (modelo == '' || placa == '') {
            alert('Preencha todos os campos');
        }
        else {
            patio.registrar({ modelo: modelo === null || modelo === void 0 ? void 0 : modelo.toLocaleUpperCase(),
                placa: placa === null || placa === void 0 ? void 0 : placa.toLocaleUpperCase(), entrada: new Date().valueOf() }, true);
            modeloVeiculo.value = '';
            placaVeiculo.value = '';
        }
    });
})();
