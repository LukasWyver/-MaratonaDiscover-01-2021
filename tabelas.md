<!-- meus font's awesome -->

<i class="far fa-arrow-alt-circle-up" id="entradas"></i>

<i class="far fa-arrow-alt-circle-down" id="saidas"></i>

<i class="fas fa-dollar-sign" id="total"></i>

<!-- minha tabela explicativa -->

<table id="data-table">
                    <thead>        <!--table-head //  cabeçalho da tabela-->
                        <tr>          <!--table-row // linha do cabeçalho-->
                            <th>Descrições</th>   <!--Coluna do cabeçalho-->
                            <th>Valor</th>        <!--Coluna do cabeçalho-->
                            <th>Data</th>         <!--Coluna do cabeçalho-->
                            <th></th>             <!--Coluna do cabeçalho-->
                        </tr>
                    </thead>
                    <tbody>                                         <!--table-body //  conteúdo da tabela-->
                        <tr>                                  <!--table-row // linha do corpo do conteúdo-->
                            <td class="description">Luz</td>             <!--valores do corpo do conteúdo-->  
                            <td class="expense">-R$ 100,00</td>          <!--valores do corpo do conteúdo-->
                            <td class="date">19/01/2021</td>             <!--valores do corpo do conteúdo-->
                            <td>  <img src="./assets/minus.svg" alt="Remover transação"> </td>
                        </tr>
                        <tr>
                            <td class="description">Aluguel</td>          <!--description = descrição-->
                            <td class="income">+R$ 500,00</td>                     <!--income = renda-->
                            <td class="date">25/01/2021</td>                          <!--date = data-->
                            <td>  <img src="./assets/minus.svg" alt="Remover transação"> </td>
                        </tr>
                         <tr>
                            <td class="description">Carro</td>
                            <td class="expense">-R$ 300,00</td>                <!--expense = despesas-->
                            <td class="date">30/01/2021</td>
                            <td>  <img src="./assets/minus.svg" alt="Remover transação"> </td>
                        </tr>
                    </tbody>
                </table>

<!-- minhas transações -->

      {
        description:'Luz',
        amount:-10000,
        date:'19/01/2021',
      },
      {
        description:'Aluguel',
        amount:+50000,
        date:'25/01/2021',
      },
      {    
        description:'Carro',
        amount:-30000,
        date:'30/01/2021',
      }
    