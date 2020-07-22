<template>
    <div>
      <Card>
        <Row :gutter="12">
          <Col :span="24" :style="{textAlign: 'right'}">
            <Button type="primary" @click="showModal">新增</Button>
          </Col>
          <Col :span="24" :style="{marginTop: '10px'}">
            <Table border :columns="userColumns" :data="userList"></Table>
            <Page :total="total" show-sizer show-total :style="{marginTop: '10px',textAlign: 'right'}" @on-change="changePage" @on-page-size-change="sizeChange"/>
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
      addModal: false,
      total: 0,
      page: 1,
      size: 10,
      formItem: {
        username: '',
        password: '',
        phone: '',
        roleIds: [],
        avatar: ''
      },
      defaultList: [],
      imgName: '',
      visible: false,
      uploadList: [],
      userColumns: [
        {
          title: '#',
          key: 'id',
          align: 'center'
        },
        {
          title: '用户名',
          key: 'username',
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
          title: '创建时间',
          key: 'createTime',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
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
                  type: 'error',
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
    getList () {
      let query = {
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
      this.getList()
    },
    sizeChange (size) {
      this.size = size
      this.getList()
    }
  },
  computed: {
    ...mapState({
      listData: state => state.user.listData,
      roleList: state => state.role.roleList
    })
  },
  mounted () {
    this.getRoleList()
  },
  created () {
    this.getList()
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
