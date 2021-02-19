const Modal = {
    open(){
      // Abrir o modal
      // Adicionar a class active ao modal
      document
        .querySelector('.modal-overlay') /* pesquisou no doc. todo */
        .classList                    /* buscou a lista de classes */
        .add('active')                /* adicionou a classe active */
    }, // Modal aberto

    close(){
      // fechar o modal
      // Remover a class active ao modal
      document
        .querySelector('.modal-overlay') /* pesquisou no doc. todo */
        .classList                    /* buscou a lista de classes */
        .remove('active')             /* removeu a classe active   */
    } // Modal fechado
  } // Modal

const Storage = {
    get() {
      return JSON.parse(localStorage.getItem('dev.finances:transactions')) || []
    },
      set(transactions) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
} // Função para salvar na memoria do navegador os dados das transações

const Transaction = {
      all: Storage.get(), 
      // todas as transações

      add(transaction){
        Transaction.all.push(transaction)

        App.reload()
      }, // adicionando uma transação

      remove(index){
        Transaction.all.splice(index,1)

        App.reload()
      }, // removendo uma transação

      incomes() {
          // somar as entradas
        let income = 0;
          // pegar todas as transações
          Transaction.all.forEach((transaction) => {
              // para cada transação, se ela for maior que zero
              if( transaction.amount > 0) {
                  // somar a uma variavél e retornar a variavél
                    income += transaction.amount;
              }
            })
          return income;
      }, // Entradas

      expenses() {
          // somar as saídas
        let expense = 0;
          // pegar todas as transações
          Transaction.all.forEach((transaction) => {
              // para cada transação, se ela for menor que zero
              if( transaction.amount < 0) {
                  // somar a uma variavél e retornar a variavél
                    expense += transaction.amount;
              }
            })
          return expense
      }, // Saídas

      total() {
          // entradas menos saídas
          return Transaction.incomes() + Transaction.expenses()
      } // Total

} // Funcão responsavél por apresentar o resultado das transações.

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction,index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index
        
        DOM.transactionsContainer.appendChild(tr)
        
    }, // criando a tag "tr"

    innerHTMLTransaction(transaction, index){
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>               
            <td class="date">${transaction.date}</td>
            <td><img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação"></td>
        `

        return html
    }, // criando a estrutura html dentro da tag "tr"

    updateBalance(){
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
            // substituindo o valor da expressão "Entradas" dentro do html
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
            // substituindo o valor da expressão "Saídas" dentro do html
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
            // substituindo o valor da expressão "Total" dentro do html
    }, // substituindo os valores da section "Balance" do html com os dados do JS

    clearTransactions(){
        DOM.transactionsContainer.innerHTML = ""
    } // resetando os dados do html 

}  // Substituir os dados do HTML com os dados do JS

const Utils = {
    formatAmount(value){
      value = value * 100
      
      return Math.round(value)
    },

    formatDate(date){
      const splittedDate = date.split("-")
      return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""
            // adcionando o sinal de "-"
        value = String(value).replace(/\D/g,"")
            // removendo o sinal de "."
        value = Number(value) / 100
            // dividindo o valor por 100
        value = value.toLocaleString("pt-BR",{
            style:"currency",
            currency: "BRL"
        })
            // formatando o sinal em reais
        return signal + value
    } // formatando em sinal de Real R$ 
}  // Responsavél por formatar os dados 

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
      return{
        description:Form.description.value,
        amount:Form.amount.value,
        date:Form.date.value
      }
    }, // pegar os dados preenchidos
   
    validateFields(){
      const {description,amount,date } = Form.getValues()
      
      if( description.trim() === "" ||
          amount.trim() === "" || 
          date.trim() === "" ){
            throw new Error("Por favor, preencha todos os campos!")
       }
    }, // validar se todos os campos estão preenchidos

    formatValues(){
      let {description,amount,date } = Form.getValues()

      amount = Utils.formatAmount(amount)

      date = Utils.formatDate(date)

      return{
        description,
        amount,
        date
      }
    }, // formatar os dados

    saveTransaction(transaction){
      Transaction.add(transaction)
    }, // salvar os dados

    clearFields(){
      Form.description.value = ""
      Form.amount.value = ""
      Form.date.value = ""
    }, // remover os dados

    submit(event) {
        event.preventDefault()

        try {

        // verificar se todas as informações foram preenchidas
        Form.validateFields()
        // formatar os dados para salvar
        const transaction = Form.formatValues()
        // salvar
        Form.saveTransaction(transaction)
        // apagar os dados do formulario
        Form.clearFields()
        // modal feche 
        Modal.close()
       
        } catch (error) {
          alert(error.message)
        }
    
    }
} // Fomulario


const App = {
    init() {

        Transaction.all.forEach(DOM.addTransaction) 
              
        DOM.updateBalance()

        Storage.set(Transaction.all)
              
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

App.init()