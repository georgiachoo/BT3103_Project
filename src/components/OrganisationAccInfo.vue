<template>
    
    <div>
        <img id = "OrganisationPic" src="@/assets/organisation.png" alt=""/>
        <h2>Name of Organisation</h2>
    <table>
        <tr>
        <th>Organisation Details:</th>
        <td>compulsory to fill</td>
        </tr>
  
    </table>
    <br>
    
    </div>
    <div class="left"> 
        <h4>Rate:</h4>  </div>
    <div class="right"> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span></div>
    
</template>

<script>

export default {
    name: 'OrganisationAccInfo',
    
}
</script>

<style scoped>
 th{
  
  border: 1px solid;
  
  
}
td {
    text-align: start;
    border: 1px solid;
    width: 75%;
    height: 200px;

}
table {
    border: 1px solid;
    width: 100%;
}
.checked {
  color: orange;
  

}
.fa {
  font-size: 30px;
}

 .left {
            width: 25%;
            float: left;
            height: 100px;
            text-align: center;
            
            
        }
.right {
            width: 75%;
            float:left;
            height: 100px;
            text-align: center;
        }


</style>
