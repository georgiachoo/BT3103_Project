<template>
  <h1>My Account</h1>

  <form id="accountPage">

        <img id="display">
        <input type="file" id="input" accept="image/*">
        <label for="input" id="uploadBtn"> Choose Profile Picture</label><br><br>

        <img id="gameConsole" src="game.png">
        <label for="gameConsole" id="score"> Score: </label><br><br>

        <button id="editBtn"> Edit</button><br><br>

        <label for="name"> Name: </label>
        <input type="text" id="name" required="" placeholder="Enter your name"> <br><br>
        
        <label for="age"> Age: </label>
        <input list="age" name="age">
        <datalist id="age">
            <option value="13-17">
            <option value="18-20">
            <option value="21-29">
            <option value="30-39">
            <option value="40-59">
            <option value="Above 60">
        </datalist><br><br>
        
        <label for="gender"> Gender: </label>
        <input list="gender" name="gender">
        <datalist id="gender">
            <option value="Male">
            <option value="Female">
            <option value="Non-binary">
        </datalist><br><br>
        
        <label for="email"> Email: </label>
        <input type="email" id="email" required="" placeholder="Enter your email"><br><br>

        <label for="skills"> Skills: </label>
        <textarea name="skills" id="skills" cols="30" rows="5" placeholder="Relevant skills"></textarea><br><br>

        <label for="interest"> Volunteering Interests: </label>
        <textarea name="interest" id="interest" cols="30" rows="5" placeholder="Children, Elderly, Environment..."></textarea><br><br>

        <label for="cert"> Certifications: </label>
        <textarea name="cert" id="cert" cols="30" rows="5" placeholder="First-Aid trained, Open water diver..."></textarea><br><br>

        <label for="exp"> Experience: </label>
        <textarea name="exp" id="exp" cols="50" rows="10" placeholder="Relevant volunteering experience"></textarea><br><br>
    
        <label for="intro"> Self-Introduction: </label>
        <textarea name="intro" id="intro" cols="50" rows="10" placeholder="Let volunteer organisations know you better"></textarea><br><br>
    </form>
</template>

<script>
export default {

}
</script>

<style>
    label {
        display: inline-block;
        text-align: right;
        width: 100px;
    }
    textarea{
        vertical-align: middle;
    }
    body{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #display{
        height: 100px;
        width: 100px;
        border-radius: 50%;
        border: 1px solid gray;
        background-position: center;
        background-size: cover;
    }
    #input{
        display: none;
        transform: translateX(-10%);
    }
    #uploadBtn{
        height: 40px;
        text-align: center;   
        background: rgba(0, 0, 0, 0.5);
        color: wheat;
        line-height: 20px;
        font-size: 15px;
    }
    #gameConsole{
        height: 80px;
        width: 120px;
        float: right;
        transform: translate(-130%, -150%);
    }
    #score{
        transform: translate(205%, -150%);
    }
    #editBtn{
        transform: translate(500px, -120px);
        background-color: darkslategrey;
        color: white;
    }
</style>