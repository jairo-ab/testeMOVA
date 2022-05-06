<template>
  <div class="py-4 container-fluid">
  <div class="row">

      <div v-if="most" class=" d-flex justify-content-between col-xl-12  col-lg-12 col-sm-12">
        <div> 
          <img class="ml-4" :src="logo" alt="logo mova">  
        </div>
        <div class=" mr-4 d-flex align-items-center" >
          <button  style="border: 1px solid #6D2080; color:  #6D2080; background: transparent">
            <img class="p-2" :src="left" alt="voltar">  
            <span  class="align-middle p-2" >  Voltar</span>
          </button>
        </div>
      </div>

      <div class="row  align-items-center ">
          <div class="col-lg-4 col-sm-4">
            <select-seleciona @opcao="opcaoComponent" />
          </div>
          <div v-if="showSelect" class="col-lg-4 col-sm-4">
            <select-filtro :opcRequisicao="opcRequisicao"/>
          </div>
          <div class="col-lg-4 col-sm-4">
            <btn-pesquisar/>
          </div>
      </div>

      <div v-if="showBandeiras" class="row  align-items-center ">
          <div class="col-lg-4 col-sm-4">
            <bandeiras :opcaoBuscar="opc" />
          </div>
      </div>

      </div>

      <div class="vld-parent">
        <loading
        :active.sync="isLoading" 
        :can-cancel="false"
        :loader="typeLoader"
        color='#32a976'
        background-color='#c4c4c4'
        :width = 150
        :height = 70
        :is-full-page="true"></loading>
      </div>

  </div>
</template>

<script>

import logo from "@/assets/logo_principal.svg";
import left from "@/assets/left.svg";
import SelectSeleciona from "@/components/Select.vue";
import SelectFiltro from "@/components/SelectFiltro.vue";
import BtnPesquisar from "@/components/BtnPesquisar.vue";
import Bandeiras from "@/components/Bandeiras.vue";

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
const Swal = require("sweetalert2");

export default {

    components: {
      Loading,
      SelectSeleciona,
      SelectFiltro,
      BtnPesquisar,
      Bandeiras
    },

    data(){
      return {
        most: false,
        logo,
        left,
        next: 1,
        dadosJogadorAll: [],
        dadosJodador: false,
        btnFooter: false,
        MsgLoad: '',
        isLoading: false,
        typeLoader:'bars',
        pesquisarInformacao: '',
        selected: 0,
        buscarRota:'',
        detalhes: [],
        select: false,
        url:'',
        opc:'',
        showBandeiras: false,
        opcRequisicao:'',
        showSelect: false,
        
      }
    },

  mouted(){ 
  },

  methods: {

  
    opcaoComponent(value){
      this.opc = value;
      this.opcRequisicao = value;
      this.showBandeiras = true
      this.showSelect = true;
      console.log("passando dados", this.opc)
      setTimeout( () => {
         this.showBandeiras = false
      }, 2000)

    },

    
    controllPage(data) {
      this.isLoading = true;
      this.selected = '';
      if(data == 3){
        this.next = 1;
      }
      if(data == 1){
        if(this.next == 1){
          this.next = 1;
        } else {
          this.next = this.next - 1;
        }
      } 
      if(data == 2) {
        this.next = this.next + 1;
      }

       this.axios.get("/api/listallplayers?page="+ this.next  ).then(response => {
         this.isLoading = false;
         console.log('response =====>>>>>>', response)
         if(response.data.length > 0){
           this.dadosJogadorAll = response.data;
           this.dadosJodador = true;
           this.btnFooter = true;
           this.select = false ;
         }
    });
    },

      mostrarMsg(titulo, sub, icon){
       Swal.fire(
          titulo,
          sub,
          icon
        )
    },

    buscar() {

      if(!this.pesquisarInformacao){

         this.mostrarMsg("Atenção", "Preencha o campo!", "info")
         return
      }
      
       this.isLoading = true;
       this.dadosJogadorAll = [];
      
      if(this.selected == 0 ){

          let words = this.pesquisarInformacao.toLowerCase().split(" ");
          for (let a = 0; a < words.length; a++) {
          let w = words[a];
          words[a] = w[0].toUpperCase() + w.slice(1);
          }

          let nome = words.join(" ");

        this.buscarRota = "/api/listplayersname?long_name="+ nome //buscar por nome

      }
      else if(this.selected == 1 ){

         let words = this.pesquisarInformacao.toLowerCase().split(" ");
          for (let a = 0; a < words.length; a++) {
          let w = words[a];
          words[a] = w[0].toUpperCase() + w.slice(1);
          }

          let equipe = words.join(" ");

        this.buscarRota = "/api/listplayersnameequipe?club_name="+ equipe   //buscar por equipe

      }
      else if(this.selected == 2 ){

        this.buscarRota = "/api/listplayersnameliga?league_name="+ this.pesquisarInformacao   //buscar por liga

      }
      else if(this.selected == 3 ){

        this.buscarRota = "/api/listplayersnamenation?nationality="+ this.pesquisarInformacao   //buscar por nacionalidade

      }
      else if(this.selected == 4 ){

        this.buscarRota = "/api/listplayersnameposition?player_positions="+ this.pesquisarInformacao.toUpperCase()  //buscar por posição

      }
      else if(this.selected == 5 ){

        this.detalhes = [];

        this.buscarRota = "/api/listplayersnameid?sofifa_id="+ this.pesquisarInformacao  //buscar por posição

      }

  this.axios.get(this.buscarRota).then(response => {
         this.isLoading = false;

         if(response.data.length > 0){

           if(this.selected == 5){
              this.detalhes = response.data;
              let part1 = this.detalhes[0].sofifa_id.substring(0, 3)
              let  part2 = this.detalhes[0].sofifa_id.substring(3,  this.detalhes[0].sofifa_id.length)

              this.url = `https://cdn.sofifa.com/players/${part1}/${part2}/21_360.png`         //montar url p buscar imagem

              this.dadosJodador = false;
              this.btnFooter = false;
              this.select = true;
               
           } else {
              this.dadosJogadorAll = response.data;
              this.dadosJodador = true;
              this.btnFooter = false;
              this.select = false ;
          }

         }
    })
     .catch(error => {
          console.error(error);
          
         this.mostrarMsg("Atenção", "Dados não encontrado!", "info")
          
        });

    }
  }
}
</script>

<style scoped>

.title {
   justify-content: center;
   justify-items: center;
   text-align: center;
   margin: auto
}
.footerBtn {
  display: flex;
  justify-content: space-between;
  
}
.avatarDados {
  width: 600px;
  margin: auto;
  background: #DCDCDC;
  justify-content: center;
  justify-items: center;
  border-radius: 12px;
}
.caracte {
  margin-top: 15px;
  margin-left: 15px;
  text-align: left;
  font-family: "Comfortaa", cursive;
  color: #483698;
  font-weight: bold;
  display: flex;
  
}

</style>''