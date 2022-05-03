interface IVeiculo {
    modelo: string | undefined;
    placa: string | undefined;
    entrada: number;
}

(function(){
    const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

    const patio = {
        ler: (): IVeiculo[] => {
            return localStorage.getItem('patio') ?
                JSON.parse(localStorage.getItem('patio') as string) : [];
        },
        salvar: (veiculos: IVeiculo[]): void => {
            localStorage.setItem('patio', JSON.stringify(veiculos));
        },
        render: () => {
            const patioVeiculos = $('#patio-veiculos');
            patioVeiculos.innerHTML = '';

            const veiculos = patio.ler();

            if(veiculos.length){
                veiculos.forEach(veiculo => {
                    patio.registrar(veiculo);
                });
            }
        },
        registrar: (veiculo: IVeiculo, salva?: boolean) => {
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
            `
            patioVeiculos?.appendChild(row);

            row.querySelector('#btn-remover')?.addEventListener('click', function(){
                patio.remover(this.dataset.placa);
            });

            if(salva){
                patio.salvar([...patio.ler(), veiculo]);
            }
        }, 
        remover: (dataPlaca: string) => {
            const diferencaDatas = (new Date().getTime() - new Date(patio.ler()
                .find(veiculo => veiculo.placa === dataPlaca)?.entrada).getTime());

            const minutos = Math.floor(diferencaDatas / 1000 / 60);

            if(confirm(`Deseja remover o veículo com placa ${dataPlaca}?
            \nTempo de permanência: ${minutos}min
            \nValor a ser pago: R$${minutos * 0.50}`)){
                patio.salvar(patio.ler().filter(veiculo => veiculo.placa !== dataPlaca));
                patio.render();
            }
        }
    }

    patio.render();

    $('#btn-cadastrar')?.addEventListener('click', () => {
        const modeloVeiculo = $('#modelo-veiculo');
        const placaVeiculo = $('#placa-veiculo');

        const modelo = modeloVeiculo.value.trim();
        const placa = placaVeiculo.value.trim();

        if(modelo == '' || placa == '') {
            alert('Preencha todos os campos');
        } else {
            patio.registrar({modelo: modelo?.toLocaleUpperCase(), 
                placa: placa?.toLocaleUpperCase(), entrada: new Date().valueOf()}, true);
            
            modeloVeiculo.value = '';
            placaVeiculo.value = '';
        }
    });	
})();