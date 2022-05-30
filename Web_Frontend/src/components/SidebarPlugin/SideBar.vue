<template>
  <div class="sidebar"
       :data-background-color="backgroundColor"
       :data-active-color="activeColor">
    <!--
            Tip 1: you can change the color of the sidebar's background using: data-background-color="white | black | darkblue"
            Tip 2: you can change the color of the active button using the data-active-color="primary | info | success | warning | danger"
        -->
    <!-- -->
    <div class="sidebar-wrapper" id="style-3">
      <div class="logo">
        <a href="#" class="simple-text">
            <div class="logo-img">
                <img src="@/assets/img/tomato_logo.png" alt="" style="position: relative; top:-2px"/>
            </div>
          {{title}}
        </a>
      </div>
      <slot>

      </slot>
      <ul class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot name="links">
          <sidebar-link v-for="(link,index) in sidebarLinks"
                        :key="index"
                        :to="link.path"
                        :name="link.name"
                        :icon="link.icon">
          </sidebar-link>
        </slot>
      </ul>
      <moving-arrow :move-y="arrowMovePx">

      </moving-arrow>



      <div class="mb-3 col" id="user-info" style="position: absolute; bottom: 5px; left:20px">
        <img src="@/assets/img/itf_logo_2.png" style="width: 50%; margin-left: 20px;"/>
        <div class="row">
          <img v-on:click="signOut" src="@/assets/img/user.png" alt="" style="width: 10%; height:10%; margin-right: 10px; margin-left: 10px;" />
          <p v-on:click="signOut" style="font-size: 15px; color: white; font-weight: bolder; position: relative; top: 2px">{{userName}}</p>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import MovingArrow from "./MovingArrow.vue";
import SidebarLink from "./SidebarLink";
export default {
  props: {
    title: {
      type: String,
      default: "Catch-Up!"
    },
    backgroundColor: {
      type: String,
      default: "black",
      validator: value => {
        let acceptedValues = ["white", "black", "darkblue"];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    activeColor: {
      type: String,
      default: "success",
      validator: value => {
        let acceptedValues = [
          "primary",
          "info",
          "success",
          "warning",
          "danger"
        ];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    sidebarLinks: {
      type: Array,
      default: () => []
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      autoClose: this.autoClose,
      addLink: this.addLink,
      removeLink: this.removeLink
    };
  },
  components: {
    MovingArrow,
    SidebarLink
  },
  computed: {
    /**
     * Styles to animate the arrow near the current active sidebar link
     * @returns {{transform: string}}
     */
    arrowMovePx() {
      return this.linkHeight * this.activeLinkIndex;
    }
  },
  data() {
    return {
      linkHeight: 65,
      activeLinkIndex: 0,
      windowWidth: 0,
      isWindows: false,
      hasAutoHeight: false,
      links: [],
      userName: '',
    };
  },
  methods: {
    findActiveLink() {
      this.links.forEach((link, index) => {
        if (link.isActive()) {
          this.activeLinkIndex = index;
        }
      });
    },
    addLink(link) {
      const index = this.$slots.links.indexOf(link.$vnode);
      this.links.splice(index, 0, link);
    },
    removeLink(link) {
      const index = this.links.indexOf(link);
      if (index > -1) {
        this.links.splice(index, 1);
      }
    },
    signOut() {
      if(confirm("로그아웃 하시겠습니까?")){
        this.$store.dispatch('signOut')
          .then(()=>{
            this.$router.push({name: 'login'})
            alert('로그아웃 되었습니다.')
          })
      }
    }
  },
  mounted() {
    this.$watch("$route", this.findActiveLink, {
      immediate: true
    });
  },
  created() {
    this.userName = this.$store.state.userId;
  }
};
</script>
<style>
.simple-text{
  font-size: larger !important;
}
</style>
