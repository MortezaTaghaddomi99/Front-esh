<template>
    <div class="wrapper">
        <div>
          <div >
            <h1>
               اطلاعات کلاس 
            </h1>

            <div >
              <input
                  v-model="lessonName"
                  type="text"
                  pattern="[a-z A-Z]*"
                  required
                  placeholder="نام درس"
              />
              <div class="requirements">
              .نام درس باید فقط شامل حروف و فاصله باشد 
              </div>
            </div>
          </div>
        </div>

        
        <div>
          <div>
            <h1>
               توضیحات کلاس
            </h1>
            <input style="height: 120px"
              v-model="description"
              type="text"
              pattern="[a-z_ ,.A-Z0-9-!]{3,}"
              required
              placeholder="توضیحات کلاس"
            />
            <div class="requirements">
            .توضیحات کلاس باید شامل حداقل ۳ کاراکتر و فقط شامل حروف ، اعداد ، و کاراکتر های رایج باشد 
            </div>
          </div>
          
        </div>
        <div style="width: 20%;" class="button" id="button-3" @click="submitClass">
          <div id="circle"></div>
          <a href="#">ساخت کلاس</a>
        </div>
        <div style="width: 100%">
          <loading v-if="waiting" ></loading>
        </div>

    </div>
   
</template>

<script>
import loading from '../../public/loading.vue'
import store from './../store.js'
export default {
 beforeRouteEnter : (to,from,next)=>{
          if(!localStorage.token){
              alert("ابتدا وارد حساب کاربری خود شوید")
              next('/account')
          }else{
              next()
          }
          
    },
  
mounted: function(){
        store.dispatch('getClassroomDetails',
        {
            className: this.$route.params.className,
            success:(data)=>{
                this.description = data.description
                this.lessonName = data.lesson.name
                this.className = data.name
                if(data.role == "teacher"){
                  
                }else{
                  alert("شما اجازه ی ایجاد تغییرات در کلاس را ندارید")
                  this.$router.push({name: 'classrooms'})
                }
            },
            failure:(message)=>{ 
                // alert("خطا به هنگام گرفتن اطلاعات مربوط به کلاس") 
                alert(message)
                this.$router.push({name: 'notFound'})
            }
        }
        )
    },
    components:{
        'loading': loading
    },
    data: function(){
        return{
            className: "",
            lessonName: "",
            description: "",
            waiting : false
        }
        
    },
    methods:{
        checkLessonName(){  
            var nametest =/^[a-zA-Z\s.]*$/
            if(nametest.test(this.lessonName)){
                console.log("lessonName is fine")
                return true;
            }else{
                console.log("lessonName is wrong")
                return false;
            }
        },
        checkDescription(){ 
            var nametest =/^[a-z_ ,.A-Z0-9-!]{3,}$/
            if(nametest.test(this.description)){
                console.log("description is fine")
                return true;
            }else{
                console.log("description is wrong")
                return false;
            }
        },
       
        checkAll(){
            return this.checkLessonName () && this.checkDescription()
        },
        submitClass(){
            this.waiting = true
            
            if(this.checkAll()){
                const classData = {
                    lesson: {name: this.lessonName},
                    description: this.description,
                    name: this.className,
                }
                console.log(classData)
                // this.$store.dispatch('submitClass',{
                //  classData: classData,
                //  success:(data)=>{
                //      this.waiting = false
                //      console.log("success callback:",data)
                //      this.$router.push({name: 'classroom', params:{className: classData.name}})
                //  },
                //  failure:(message)=>{
                //     //  alert("خطا به هنگام ایجاد کلاس جدید")
                //      aler(message)
                //      this.waiting = false
                //      }
                // })
            }else{
                alert("اطلاعات وارد شده صحیح نیست!، لطفا موارد قرمز را برطرف کرده و هیچ قسمتی را خالی نگذارید")
                this.waiting = false
            }
        }
    }
}
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
  text-align: center;
}
.wrapper h1{
  font-family: "Baloo Bhaijaan", cursive;
  color: black;
  letter-spacing: 0px;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
}
.wrapper hr{
  opacity: 0.2;
}
.crtacc{
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
</style>
