<template>
  <div class="wrapper animated bounce">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <h1>ثبت نام</h1>
    <form>
      <div>
        <input
          v-model="username"
          type="text"
          pattern="[a-z_A-Z0-9]{4,}"
          required
          placeholder="نام کاربری"
        />
        <div class="requirements">
         نام کاربری باید حداقل ۴ کاراکتر و فقط شامل حروف ، اعداد و _  باشد
        </div>
      </div>

      <div>
        <input
          type="password"
          v-model="password"
          required
          placeholder="کلمه عبور"
          pattern=".{8,}"
        />
        <div class="requirements">
           .کلمه عبور باید حداقل ۸ کاراکتر داشته باشد
        </div>
      </div>

      <div class="button" id="button-3" @click="postData">
        <div id="circle"></div>
        <a href="#">ثبت نام</a>
      </div>

         <div style="width: 100%">
      <loading v-if="waiting" ></loading>
    </div>
    </form>
  </div>
</template>
<script>
import loading from '../../public/loading.vue'
export default {
  components:{
    'loading': loading
  },
  data: function() {
    return {
      username: "",
      password: "",
      waiting: false
    };
  },
  computed: {
    checkSubmission: function() {
      return this.passwordStatus && this.usernameStatus;
    }
  },
  methods: {
    checkAll: function() {
      this.checkUsername();
      this.checkPassword();
    },
    checkUsername: function() {
      const usernameFormat = /^[a-z_A-Z0-9]{4,}$/;
      if (usernameFormat.test(this.username)) {
        console.log("username is fine");
        this.usernameStatus = true;
      } else {
        console.log("username is wrong");
        this.usernameStatus = false;
      }
    },

    checkPassword: function() {
      if (this.password.length >= 8) {
        console.log("password is fine");
        this.passwordStatus = true;
      } else {
        console.log("password is wrong");
        this.passwordStatus = false;
      }
    },
    postData() {
      this.waiting = true;
      this.checkAll();
      if (this.checkSubmission) {
        const newRegister = {
          username: this.username,
          password: this.password
        };

        this.$store.dispatch("signup", {
          newRegister: newRegister,
          success: () => {
            this.$store.dispatch("getProfile", {
              success: () => {
                this.waiting = false;
                this.$router.push({ name: 'profile'});
              },
              failure: (message) => {
                this.waiting = false;
                // alert("خطا به هنگام دریافت اطلاعات حساب") 
                alert(message)
              }
            });
          },
          failure: (message) => {
            this.waiting = false;
            alert(message) 
          }
        });
      } else {
        this.waiting = false;
        alert(" .اطلاعات وارد شده صحیح نیست! لطفا موارد قرمز را برطرف کنید");
      }
    }
  }
};
</script>

<style>
body {
  background-attachment: fixed;
}
input {
  padding: 20px 20px 20px 50px;
  width: 100%;
  margin-bottom: 10px;

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
.selectItems {
  padding: 20px 0px 20px 50px;
  width: 30%;
  height: 50px;
  margin-bottom: 10px;
  margin-right: 5px;
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
.selectItems:focus {
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
@import url(https://fonts.googleapis.com/css?family=PT+Sans:400);

// positioning context
input[type="password"] {
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
}
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

.button {
  display: inline-flex;
  height: 40px;
  width: 150px;
  border: 2px solid #bfc0c0;
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
  color: #bfc0c0;
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
  background: #bfc0c0;
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

* {
  box-sizing: border-box;
}
.css-selector {
  font-family: "Baloo Bhaijaan", cursive;
}
</style>
