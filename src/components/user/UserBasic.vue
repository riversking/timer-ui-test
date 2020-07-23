<template>
  <div>
    <Card>
      <Row :gutter="12">
        <Col :span="12" :style="{textAlign: 'left'}">
          <Input placeholder="请输入员工名进行搜索，可以直接回车搜索..." prefix-icon="el-icon-search"
                 clearable
                 style="width: 350px;margin-right: 10px" v-model="keyword"
                 :disabled="showAdvanceSearchView"
          ></Input>
          <Button :disabled="showAdvanceSearchView" icon="md-search" type="primary" @click="initUserList">
            搜索
          </Button>
          <Button type="primary" @click="showAdvanceSearchView = !showAdvanceSearchView">
            <i :class="showAdvanceSearchView?'fa fa-angle-double-up':'fa fa-angle-double-down'"
               aria-hidden="true"></i>
            高级搜索
          </Button>
          <transition name="el-fade-in-linear">
            <div v-show="showAdvanceSearchView" class="transition-box">
              <div v-show="showAdvanceSearchView"
                   style="border: 1px solid #409eff;border-radius: 5px;box-sizing: border-box;padding: 5px;margin: 10px 0px;">
                <Row>
                  <Col :span="2">
                    手机号:
                  </Col>
                  <Col :span="8">
                    <Input placeholder="请输入手机号进行搜索，可以直接回车搜索..." prefix-icon="md-search" size="small" v-model="phone" clearable></Input>
                  </Col>
                  <Col :span="2" style="margin-left: 10px">
                    创建时间:
                  </Col>
                  <Col :span="8">
                    <DatePicker
                      v-model="searchDate"
                      type="daterange"
                      size="small"
                      format="yyyy-MM-dd"
                      range-separator="至"
                      placeholder="请选择时间">
                    </DatePicker>
                  </Col>
                  <Col :span="3" style="margin-left: 10px">
                    <Button icon="md-search" type="primary" size="small" @click="initUserList">
                      搜索
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </transition>
        </Col>
        <Col :span="12" :style="{textAlign: 'right'}">
          <Button type="primary" icon="ios-cloud-upload">导入用户</Button>
          <Button type="primary" icon="md-download">导出用户</Button>
          <Button type="primary" icon="md-add" @click="showModal">添加用户</Button>
          <Modal
            v-model="addModal"
            title="添加用户"
          >
            <Form :model="userForm" :disabled="detail" ref="userForm" label-position="left" :label-width=80
                  style="margin-left: 50px;">
              <Row>
                <Col :span="24">
                  <FormItem label="用户名:" prop="username">
                    <Input v-model="userForm.username" style="width: 80%" prefix-icon="el-icon-edit"
                           auto-complete="new-accounts"
                           placeholder="请输入用户名"></Input>
                  </FormItem>
                </Col>
                <Col :span="24">
                  <FormItem label="密码:" prop="password" v-if="edit===false && detail === false">
                    <Input v-model="userForm.password" type="password" style="width: 80%" prefix-icon="el-icon-edit"
                           placeholder="请输入密码" autocomplete="new-password" show-password></Input>
                  </FormItem>
                </Col>
                <Col :span="24">
                  <FormItem label="工号:" prop="userId">
                    <Input v-model="userForm.userId" style="width: 80%"
                           placeholder="请输入工号"></Input>
                  </FormItem>
                </Col>
                <Col :span="24">
                  <FormItem label="手机号:" prop="phone">
                    <Input v-model="userForm.phone" style="width: 80%"
                           placeholder="请输入手机号"></Input>
                  </FormItem>
                </Col>
                <Col :span="24" v-if="!edit">
                  <FormItem label="邮箱:" prop="mail">
                    <Input v-model="userForm.mail" type="email" style="width: 80%" placeholder="请输入邮箱"></Input>
                  </FormItem>
                </Col>
                <Col :span="24" v-if="!edit">
                  <FormItem label="姓名:" prop="nickname">
                    <Input v-model="userForm.nickname" type="text" style="width: 80%" prefix-icon="el-icon-edit"
                           placeholder="请输入姓名"></Input>
                  </FormItem>
                </Col>
                <Col :span="10">
                  <FormItem label="头像:" prop="upload">

                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col :span="10">
                  <FormItem label="角色:" prop="role">

                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Modal>
        </Col>
        <Col :span="24" :style="{marginTop: '10px'}">
          <Table border :columns="userColumns" :data="userList" :loading="loading" ></Table>
          <Page :total="total" show-sizer show-total :style="{marginTop: '10px',textAlign: 'right'}"
                @on-change="changePage" @on-page-size-change="sizeChange"/>
        </Col>
      </Row>
    </Card>
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: 'userList',
  components: {},
  data () {
    return {
      namespace: 'user',
      userList: [],
      searchDate: '',
      phone: '',
      addModal: false,
      total: 0,
      page: 1,
      size: 10,
      loading: true,
      detail: false,
      edit: false,
      showAdvanceSearchView: false,
      keyword: '',
      userForm: {
        id: '',
        username: '',
        password: '',
        userId: '',
        phone: '',
        roleIds: [],
        nickname: '',
        mail: ''
      },
      defaultList: [],
      imgName: '',
      visible: false,
      uploadList: [],
      userColumns: [
        {
          title: '#',
          key: 'id',
          align: 'center',
          width: '88px'
        },
        {
          title: '用户名',
          key: 'username',
          align: 'center'
        },
        {
          title: '用户编号',
          key: 'userId',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phone',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'nickname',
          align: 'center'
        },
        {
          title: '角色',
          key: 'roleName',
          align: 'center',
          render: (h, params) => {
            if (params.row.sysRoleModels != null) {
              return h('div',
                params.row.sysRoleModels.map(i => {
                  return h('Tag', {
                    props: {
                      type: 'border',
                      color: 'primary'
                    },
                    style: {
                      marginRight: '5px'
                    }
                  }, i.roleName)
                })
              )
            }
          }
        },
        {
          title: '有效',
          key: 'isDisable',
          align: 'center',
          width: '88px',
          render: (h, params) => {
            if (params.row.isDisable === 0) {
              return h('div', '有效')
            } else {
              return h('div', '无效')
            }
          }
        },
        {
          title: '创建时间',
          key: 'createTime',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: '387px',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  icon: 'md-brush',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.getUserDetail(params.row.id)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'success',
                  icon: 'md-contact',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  icon: 'md-contacts'
                },
                on: {
                  click: () => {
                    this.getUserDetail(params.row.id)
                  }
                }
              }, '添加角色'),
              h('Button', {
                props: {
                  type: 'warning',
                  icon: 'md-checkmark',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.getUserDetail(params.row.id)
                  }
                }
              }, '有效'),
              h('Button', {
                props: {
                  type: 'error',
                  icon: 'md-trash',
                  size: 'small'
                },
                on: {
                  click: () => {
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  methods: {
    handleView (name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess (res, file) {
      console.log('res', res)
      console.log('file', file)
      file.url = 'http://localhost:10500/api/v1/image/' + res.rsp
      this.formItem.avatar = res.rsp
      file.name = res.rsp
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 2
      if (!check) {
        this.$Notice.warning({
          title: 'Up to one pictures can be uploaded.'
        })
      }
      return check
    },
    showModal () {
      this.addModal = true
    },
    addUser () {
      this.$store.dispatch('add', {'param': this.formItem})
        .then(data => {
          switch (data.code) {
            case '0':
              this.$Message.success(data.msg)
              // this.getList()
              break
            default:
              this.$Message.error(data.msg)
              break
          }
        })
    },
    getRoleList () {
      this.$store.dispatch(`roleList`, {'param': this.formItem})
        .then(data => {

        })
    },
    initUserList () {
      let query = {
        username: this.keyword,
        startDate: this.searchDate[0],
        endDate: this.searchDate[1],
        phone: this.phone,
        page: this.page,
        pageSize: this.size
      }
      this.$store.dispatch(`userPage`, {'param': query})
        .then(resp => {
          if (resp.code === '0') {
            this.userList = resp.data.records
            this.total = resp.data.total
            this.loading = false
          }
        })
    },
    getUserDetail (id) {
      this.$store.dispatch(`getUserById`, {'param': id})
        .then(data => {
          switch (data.code) {
            case '0':
              this.formItem = data.rsp
              this.addModal = true
              break
            default:
              this.$Message.error('失败!')
              break
          }
        })
    },
    changePage (page) {
      this.page = page
      this.loading = true
      this.initUserList()
    },
    sizeChange (size) {
      this.size = size
      this.loading = true
      this.initUserList()
    }
  },
  computed: {
    ...mapState({
      listData: state => state.user.listData,
      roleList: state => state.role.roleList
    })
  },
  mounted () {
    this.initUserList()
    this.getRoleList()
  }
}
</script>
<style>
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
