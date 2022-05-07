<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-xl-12 col-sm-12 mb-xl-0">
        <div class="col-xl-10 col-md-10 col-sm-10 mb-xl-0"  > 
            <div class="col-lg-12 col-12 p-3">
              <span class="title" >{{title}}</span>
                <select class="form-select form-select-lg mb-3 select-opcao " >
                  <option selected>Escolha uma opção</option>
                  <option  v-for="item in  list_filter " :key="item.id" >{{ item.data}}</option>
                  <!-- <option v-if="title = 'Capital'" v-for="item in  list_region " :key="item.id" >{{ item.region}}</option>
                  <option v-if="title = 'Língua'" v-for="item in  list_region " :key="item.id" >{{ item.region}}</option>
                  <option v-if="title = 'País'" v-for="item in  list_region " :key="item.id" >{{ item.region}}</option> -->
                </select>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
   props: ['opcRequisicao'],

  data() {
    return {
      data:'',
      opcaoUrl:'',
      dadosAll:[],
      escolhaSelect:'',
      list_region: [],
      list_capital: [],
      list_lingua: [],
      list_pais: [],
      title:'',
      list_filter:[]

    }
  },

  watch:{
    opcRequisicao: function(value){
      console.log("watch value", value)
      
      this.buscarDados(value)
    }

  },

    created() {

    // this.axios.get('https://restcountries.com/v3.1/all')
    // .then((response) => {

    //   this.dadosAll = response.data;
    //   // this.getFilterRegion()
    //   console.log("response dadosAll ", this.dadosAll )
    // })
    // .catch((error) => {
    //   console.log(error)
    // })

  },

  mounted(){
    console.log(" mounted title", this.title)
    // this.getDataAll();
    this.buscarDados(this.opcRequisicao)
    },


  methods: {

    buscarDados(value){
      console.log(value)

      switch (value) {
        case '1':
          this.title = 'Região'
          this.opcaoUrl = 'region'
          break;
        case '2':
          this.opcaoUrl = 'capital'
          this.title = 'Capital'
          this.getFilterCapital();
          break;
        case '3':
          this.opcaoUrl = 'lang'
          this.title = 'Língua'
           this.getFilterLingua();
          break;
        case '4':
          this.opcaoUrl = 'currency'
          this.title = 'País'
           this.getFilterPais();
          break;
        default:
          console.log('Escolha uma opção');
      }
    },

    getData(){

        this.axios.get(`https://restcountries.com/v3.1/region/${this.data}`)
        .then((response) => {
            console.log("response ",  response)
          })
          .catch((error) => {
            console.log(error)
          })
    },

  // //   (){

  //     this.axios.get('https://restcountries.com/v3.1/all')
  //     .then((response) => {

  //       this.dadosAll = response.data;
  //       this.getFilterRegion()
  //       console.log("response dadosAll ", this.dadosAll )
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // },

  getFilterRegion(){
        const region =  this.dadosAll.map(value => value.region)
        const noRepeated = region.reduce((array, value) => {
          return array.includes(value) ? array : [...array, value];
        }, []);

        this.list_filter = noRepeated.map((value, index) => { 
          return { id:index, data:value }
        })
        console.log(" this.list_region", this.list_filter )
  },
  getFilterCapital(){
         this.list_filter =  this.dadosAll.map(value => value.capital[0])
        // const noRepeated = region.reduce((array, value) => {
        //   return array.includes(value) ? array : [...array, value];
        // }, []);

        // this.list_filter = capital.map((value, index) => { 
        //   return { id:index, data:value }
        // })
        console.log(" this.list_region", this.list_filter )
  },
  getFilterLingua(){
        const region =  this.dadosAll.map(value => value.languages.spa)
        const noRepeated = region.reduce((array, value) => {
          return array.includes(value) ? array : [...array, value];
        }, []);

        this.list_filter = noRepeated.map((value, index) => { 
          return { id:index, data:value }
        })
        console.log(" this.list_region", this.list_filter )
  },
  getFilterPais(){
        const region =  this.dadosAll.map(value => value.name.common)
        const noRepeated = region.reduce((array, value) => {
          return array.includes(value) ? array : [...array, value];
        }, []);

        this.list_filter = noRepeated.map((value, index) => { 
          return { id:index, data:value }
        })
        console.log(" this.list_region", this.list_filter )
  }

  }
};

</script>


<style scoped>

.select-opcao {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #A8A8A8;
  font-style: normal;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: #8D8D8D;


}
.select-opca:hover{
   color: #02AE99;
  border-top: none;
  border-left: none;
  border-right: none;

}
select:focus {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
    border-bottom: 1px solid #A8A8A8;
} 

.title {
  color:#6D2080; 
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
}

</style>