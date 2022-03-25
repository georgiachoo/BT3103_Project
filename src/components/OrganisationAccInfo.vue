<template>
    
    <div>
        <img id = "OrganisationPic" src="../assets/logo.png" class = center>
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

    <table>
        <tr>
        <th>Comments from past volunteers:</th>
        <td>
            <div>
                <table class ="noBorderTb" >
                    <tr ><td id = "comment_td">one</td></tr>
                    <tr><td id = "comment_td">two</td></tr>
                    <tr><td id = "comment_td">three</td></tr>

                </table>
            </div>
        </td>
        </tr>
  
    </table>

    
</template>

<script>

export default {
    name: 'OrganisationAccInfo',
    
}
</script>

<style scoped>
 th{
  
  border: px solid;
  
  
}
td {
    
    text-align: start;
    border: 1px solid;
    width: 75%;
    height: 200px;

}
#comment_td {
    text-align: start;
    width: 75%;
    height: 100px;
  


}
#comment_tr {
    text-align: start;
    width: 75%;
    height: 100px;
    border: 0ch;


}
table {
    border: 1px solid;
    width: 100%;
}
.noBorderTb {
    border: 0px solid;
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
#OrganisationPic{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width:60%;
}

</style>
