<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-xl-12 col-sm-12 mb-xl-0">
        <div class="col-xl-10 col-md-10 col-sm-10 mb-xl-0" > 
            <div class="col-lg-12 col-12 p-3">
              <span class="title" >Filtrar por</span>
                <select class="form-select form-select-lg mb-3 select-opcao" v-model="selected"  @change="$emit('opcao', selected)"  >
                  <option selected>Escolha uma opção</option>
                  <option value="1">Região</option>
                  <option value="2">Capital</option>
                  <option value="3">Lìngua</option>
                  <option value="4">País</option>
                </select>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { mapActions, mapState } from 'vuex'

export default {

  data() {
    return {
      selected:''
    }
  },

  computed: {
		...mapState('alldata', ['data'])
	},
	
	created(){
		this.ActionAllData()
	},

	mounted(){
		console.log(this.data)
	},

  methods: {
		...mapActions('alldata', ['ActionAllData'])
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