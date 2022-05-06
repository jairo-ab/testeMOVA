<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-xl-12 col-sm-12 mb-xl-0">
        <div class="col-xl-12 col-md-14 col-sm-12 mb-xl-0" > 
            <div class="col-lg-12 col-12 p-3">
             
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {

   props: ['opcaoBuscar'],

  data() {
    return {
    }
  },

  mounted(){
    console.log("opcao requisição", this.opcaoBuscar)
  },
  methods: {
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