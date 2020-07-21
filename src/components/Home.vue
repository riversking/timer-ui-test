<template>
  <div>
    <Layout class="home-container">
      <Header class="home-header">
        <span class="home_title">管理系统</span>
        <div style="display: flex;align-items: center;margin-right: 7px">
          <Badge style="margin-right: 30px" :is-dot="this.$store.state.nfDot">
            <i class="fa fa-bell-o" @click="goChat" style="cursor: pointer"></i>
          </Badge>
          <Dropdown @command="handleCommand">
  <span class="el-dropdown-link home_userinfo" style="display: flex;align-items: center">
    {{user.nickname}}
    <i><img v-if="user.avatar!=''" :src="'api/v1/image/'+user.avatar"
            style="width: 40px;height: 40px;margin-right: 5px;margin-left: 5px;border-radius: 40px"/></i>
  </span>
            <DropdownMenu slot="dropdown">
              <DropdownItem>个人中心</DropdownItem>
              <DropdownItem>设置</DropdownItem>
              <DropdownItem command="logout" divided>注销</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider style="background: white">
          <div style="display: flex;justify-content: flex-start;text-align: left;">
            <Menu :active-name="$route.name" theme="light" style="background: white;">
              <Submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index"
                       :name="item.name">
                <template slot="title">
                  <Icon :type="item.icon"/>
                  {{item.name}}
                </template>
                <menu-item :index="index+''" v-for="(child,index) in item.children" :name="child.name" :key="index" :to="child.path">
                  <i style="color: #409eff;margin-right: 5px" :class="child.icon"></i>
                  <span>{{child.name}}</span>
                </menu-item>
              </Submenu>
            </Menu>
          </div>
        </Sider>
        <Layout :style="{padding: '0 18px 18px'}">
          <Breadcrumb :style="{margin: '18px 0',textAlign: 'left'}">
            <BreadcrumbItem :to="{ path: '/home' }">首页</BreadcrumbItem>
            <BreadcrumbItem v-text="this.$router.currentRoute.name"></BreadcrumbItem>
          </Breadcrumb>
          <div class="homeWelcome" v-if="this.$router.currentRoute.path==='/home'">
            欢迎来到微人事！
          </div>
          <Card>
            <keep-alive>
              <router-view/>
            </keep-alive>
          </Card>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  mounted: function () {
    //      this.devMsg();
    //       this.loadNF();
    this.activerouter = window.location.pathname
  },
  methods: {
    loadNF () {
      const _this = this
      this.getRequest('/chat/sysmsgs').then(resp => {
        let isDot = false
        resp.data.forEach(msg => {
          if (msg.state === 0) {
            isDot = true
          }
        })
        _this.$store.commit('toggleNFDot', isDot)
      })
    },
    goChat () {
      this.$router.push({path: '/chat'})
    },
    devMsg () {
      this.$alert('为了确保所有的小伙伴都能看到完整的数据演示，数据库只开放了查询权限和部分字段的更新权限，其他权限都不具备，完整权限的演示需要大家在自己本地部署后，换一个正常的数据库用户后即可查看，这点请大家悉知!', '友情提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.$notify({
            title: '重要重要!',
            type: 'warning',
            message: '小伙伴们需要注意的是，目前只有权限管理模块完工了，因此这个项目中你无法看到所有的功能，除了权限管理相关的模块。权限管理相关的模块主要有两个，分别是 [系统管理->基础信息设置->权限组] 可以管理角色和资源的关系， [系统管理->操作员管理] 可以管理用户和角色的关系。',
            duration: 0
          })
        }
      })
    },
    handleCommand (cmd) {
      const _this = this
      if (cmd === 'logout') {
        this.$confirm('注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.getRequest('/logout')
          _this.$store.commit('logout')
          _this.$router.replace({path: '/'})
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '取消'
          })
        })
      }
    },
    handleselect: function (a, b) {
      this.reload() // 点击侧边栏重新载入页面
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  data () {
    return {
      isDot: false,
      isRouterAlive: true,
      activerouter: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.userInfo
    },
    routes () {
      return this.$store.state.routes
    }
  }
}
</script>
<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .home-container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .home-header {
    background-color: #20a0ff;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: content-box;
    padding: 0px;
  }

  .home-aside {
    background-color: #ECECEC;
  }

  .home-main {
    background-color: #fff;
    color: #000;
    text-align: center;
    margin: 0px;
    padding: 0px;;
  }

  .home_title {
    color: #fff;
    font-size: 22px;
    display: inline;
    margin-left: 18px;
  }

  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }

  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }

  .Submenu .el-menu-item {
    width: 180px;
    min-width: 175px;
  }

  .demo-breadcrumb-separator{
    color: #ff5500;
    padding: 0 5px;
  }
</style>
