<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-xl-12 col-sm-12 mb-xl-0">
        <div class="col-xl-10 col-md-10 col-sm-10 mb-xl-0" > 
          <button
            type="button" 
            class="btn"
            style="background: #6D2080; color: #FFFFFF; border-radius: 10px; width: 158px; height: 36px"
          > 
            Pesquisar 
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {

  data() {
    return {
      country: null
    }
  },

  mounted(){
  },

};


</script>


<style scoped>

select:focus {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
    border-bottom: 1px solid #A8A8A8;
} 


</style>