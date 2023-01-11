import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import {createServer, Model} from "miragejs"


createServer({

  models: {
    transaction: Model
  },

  seeds(server){
    server.db.loadData({
      transactions: [{
        id: 1,
        title: "Freelancer",
        type: "deposit",
        category: "Dev",
        amount: 6000,
        createdAt: new Date('12-21-22')
      },
      {
        id: 2,
        title: "Alugel",
        type: "withdraw",
        category: "Dev",
        amount: 200,
        createdAt: new Date('12-14-22')
      }
    ]
    })
  },


  routes(){
    this.namespace = 'api';

    this.get("/transactions",()=>{
      return this.schema.all("transaction")
    })

    this.post("/transaction",(schema,request) =>{
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction',data)
    })
  }
})





const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


