<template>
  <div class="wrapper animated bounce">
    <h1 class="css-selector">ویرایش حساب کاربری</h1>
    <div>
      <input
        v-model="firstname"
        type="text"
        pattern="[a-z A-Z]*"
        required
        placeholder="نام "
      />
      <div class="requirements">
           .نام شما باید فقط از حروف و فاصله تشکیل شده باشد
      </div>
    </div>

    <div>
      <input
        type="text"
        v-model="lastname"
        pattern="[a-z A-Z]*"
        required
        placeholder="نام خانوادگی "
      />
      <div class="requirements">
           .نام خانوادگی شما باید فقط از حروف و فاصله تشکیل شده باشد
      </div>
    <div>

        <select placeholder ="سال" required v-model="dateofbirth.year" class="custom-select">
            <option v-for="y in range(1300,1398)" v-bind:key="y" >{{ y }}</option>
        </select>
        <select placeholder = "ماه" required v-model="dateofbirth.month" class="custom-select">
            <option v-for="m in range(1,12)" v-bind:key="m" >{{ m }}</option>
        </select>
        <select placeholder = "روز" required  v-model="dateofbirth.day" class="custom-select">
            <option v-for="d in range(1,31)" v-bind:key="d" >{{ d }}</option>
        </select>

    </div>
    <div>
      <input
        type="phonenumber"
        v-model="phonenumber"
        pattern="09[0-9]{9}"
        required
        placeholder="شماره همراه "
      />
      <div class="requirements">
       .شماره همراه شما باید معتبر باشد 
      </div>
    </div>
    <div>
      <input
        type="email"
        v-model="email"
        pattern="[a-zA-Z0-9.!#$%’*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*"
        required
        placeholder="پست الکترونیک "
      />

       <div class="requirements">
       .پست الکترونیک شما باید معتبر باشد 
      </div>
    </div>
      <div class="button" id="button-3" @click="updateProfile">
        <div id="circle"></div>
        <a href="#">ارسال اطلاعات</a>
      </div>
    </div>
    <div style="width: 100%">
      <loading v-if="waiting" ></loading>
    </div>
  </div>
</template>
<script>
import store from '../store.js'
import loading from '../../public/loading.vue'
export default{
    components:{
      'loading': loading
    },
    beforeRouteEnter : (to,from,next)=>{
          if(!localStorage.token){
              alert(" .ابتدا وارد حساب کاربری خود شوید")
              console.log("you are not loggedin yet, re-directing you to Authentication page")
              next('/account')
          }else{
              console.log("you are loggedin!, loading your profile edit page")
              next()
          }
    },
    data: function(){
      return {
        firstname: store.getters.firstName,
        lastname:store.getters.lastName,
        email: store.getters.email,
        phonenumber: store.getters.phoneNumber,
        dateofbirth: store.getters.birthdayDate,
        waiting: false
      }
    },
    methods:{
       checkAll: function(){
         return this.checkfirstname() && this.checklastname()
                && this.checknumber() && this.checkemail()
       },
       checkfirstname: function(){
            var nametest =/^[a-zA-Z\s.]*$/
            if(nametest.test(this.firstname) || this.firstname == "" || this.firstname == null){
                console.log("firstname is fine")
                return true;
            }else{
                console.log("firstname is wrong")
                return false;
            }
        },
        checklastname: function(){
            var nametest = /^[a-zA-Z\s.]*$/ 
            if(nametest.test(this.lastname) || this.lastname == "" || this.lastname== null){
                console.log("lastname is fine")
                return true;
            }else{
                console.log("lastname is wrong")
                return false;
            }
        },
        checknumber: function(){
            var numbertest = /^09[0-9]{9}$/
            if(numbertest.test(this.phonenumber) || this.phonenumber == ""|| this.phonenumber == null ){
                console.log("phonenumber is fine")
                return true;
            }else{
                console.log("phonenumber is wrong")
                return false;
            }
        },
        checkemail: function(){
            var emailtest = /^[a-zA-Z0-9.!#$%’*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/
            if(emailtest.test(this.email) || this.email == "" || this.email == null){
                console.log("email is fine")
                return true;
            }else{
                console.log("email is wrong")
                return false;
            }
            
        },
        toTimestamp: function(strDate){

          var datum = Date.parse(strDate);
          return datum/1000;
        },
        updateProfile(){
          this.waiting = true;
          console.log("checking your submission")
          
          if(this.checkAll()){
            const updatedProfile = {     
              firstName: this.firstname,
              lastName: this.lastname,
              email: this.email,
              phoneNumber: this.phonenumber,
              birthday: this.toTimestamp(this.dateofbirth.month+"/"+this.dateofbirth.day+"/"+this.dateofbirth.year)
            }
            console.log("new profile is being submitted")
            this.$store.dispatch('editProfile',{
              updatedProfile:updatedProfile,
              success:()=>{
                this.waiting = false;
                this.$router.push({name: 'profile'}) 
              },
              failure:(message)=>{
                // alert("خطا به هنگام بروزرسانی حساب کاربری");
                alert(message)
                this.waiting = false;
                console.log("failed to upddate your profile");
                
              },
            });
          }else{
            alert(".اطلاعات وارد شده صحیح نیست! موارد قرمز را برطرف کنید")
            this.waiting = false
          }
          
        },
        range: function(min,max){
          var array = [],
          j = 0;
          for(var i = min; i <= max; i++){
            array[j] = i;
            j++;
          }
          return array;
        }

    }
  };
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Baloo+Bhaijaan&display=swap");
@import "https://fonts.googleapis.com/css?family=Open+Sans";
@import "https://fonts.googleapis.com/css?family=Galada";
@import url(https://fonts.googleapis.com/css?family=Open+Sans);

input {
  padding: 20px 20px 20px 50px;
  width: 100%;
  margin-bottom: 10px;
  font-family: "Baloo Bhaijaan", cursive;
  background: rgba(0, 0, 0, 0.3);
  border: none;
  outline: none;
  font-size: 13px;
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.2),
    0 1px 1px rgba(255, 255, 255, 0.2);
  -webkit-transition: box-shadow 0.5s ease;
  -moz-transition: box-shadow 0.5s ease;
  -o-transition: box-shadow 0.5s ease;
  -ms-transition: box-shadow 0.5s ease;
  transition: box-shadow 0.5s ease;
}
input:focus {
  box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.4),
    0 1px 1px rgba(255, 255, 255, 0.2);
}
.wrapper {
  margin: 50px auto;
  width: 343px;
  height: 280px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
}
.wrapper h1 {
  font-family: "Baloo Bhaijaan", cursive;
  color: black;
  letter-spacing: 0px;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
}
.wrapper hr {
  opacity: 0.2;
}
.crtacc {
  margin-left: 75px;
}
</style>
<style lang="scss">
input[type="text"] {
  &:valid {
    background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/check.svg);
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: 20px 20px;
    & + label {
      opacity: 0;
    }
  }

  &:invalid:not(:focus):not(:placeholder-shown) {
    background: pink;
    & + label {
      opacity: 0;
    }
  }

  &:invalid:focus:not(:placeholder-shown) {
    & ~ .requirements {
      max-height: 200px;
      padding: 0 30px 20px 50px;
    }
  }
}
input[type="phonenumber"] {
  &:valid {
    background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/check.svg);
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: 20px 20px;
    & + label {
      opacity: 0;
    }
  }

  &:invalid:not(:focus):not(:placeholder-shown) {
    background: pink;
    & + label {
      opacity: 0;
    }
  }

  &:invalid:focus:not(:placeholder-shown) {
    & ~ .requirements {
      max-height: 200px;
      padding: 0 30px 20px 50px;
    }
  }
}
input[type="email"] {
  &:valid {
    background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/check.svg);
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: 20px 20px;
    & + label {
      opacity: 0;
    }
  }

  &:invalid:not(:focus):not(:placeholder-shown) {
    background: pink;
    & + label {
      opacity: 0;
    }
  }

  &:invalid:focus:not(:placeholder-shown) {
    & ~ .requirements {
      max-height: 200px;
      padding: 0 30px 20px 50px;
    }
  }
}

.requirements {
  padding: 0 30px 0 50px;
  color: #999;
  max-height: 0;
  transition: 0.28s;
  overflow: hidden;
  color: rgb(182, 87, 118);
  font-style: italic;
  font-size: 13px;
}
.requirements1 {
  padding: 0 30px 0 50px;
  color: #999;
  max-height: 0;
  transition: 0.28s;
  overflow: hidden;
  color: rgb(182, 87, 118);
  font-style: italic;
  font-size: 13px;
}
.button {
  display: inline-flex;
  height: 40px;
  width: 150px;
  border: 2px solid #3d5a5a;
  margin: 20px 20px 20px 20px;
  color: #bfc0c0;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 0.8em;
  letter-spacing: 1.5px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
a {
  color: #2d5f5f;
  text-decoration: none;
  letter-spacing: 1px;
}
#button-3 {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

#button-3 a {
  position: relative;
  transition: all 0.45s ease-Out;
}

#circle {
  width: 0%;
  height: 0%;
  opacity: 0;
  line-height: 40px;
  border-radius: 50%;
  position: absolute;
  transition: all 0.5s ease-Out;
  top: 20px;
  left: 70px;
}

#button-3:hover #circle {
  width: 200%;
  height: 500%;
  opacity: 1;
  top: -70px;
  left: -70px;
}

#button-3:hover a {
  color: #2d3142;
}
.custom-select {
  position: relative;
  padding: 20px 20px 20px 50px;
  width: 33%;
  margin: 5px;
  margin-bottom: 10px;
  font-family: "Baloo Bhaijaan", cursive;
  background: rgba(0, 0, 0, 0.3);
  border: none;
  outline: none;
  font-size: 13px;
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.2),
    0 1px 1px rgba(255, 255, 255, 0.2);
  -webkit-transition: box-shadow 0.5s ease;
  -moz-transition: box-shadow 0.5s ease;
  -o-transition: box-shadow 0.5s ease;
  -ms-transition: box-shadow 0.5s ease;
  transition: box-shadow 0.5s ease;
}


</style>
