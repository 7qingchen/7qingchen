import  { useEffect, useMemo, useState } from 'react'
import './App.scss'
import service from './request/index'
import { Flex, Layout,Table,Space,message,Button,Modal,Form,Input,Radio } from 'antd';
const { Header,  Sider, Content } = Layout;
import moment from 'moment';
export default function App() {

  // 添加弹出框
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const onCreate = async (values) => {
    let {data:{code}} = await service.post('/addUser',values)
    if(code===200){
      getUserData()
      setOpen(false);
    }
  };
  // 修改弹出框
  const [updateForm] = Form.useForm();
  const [formValues, setFormValues] = useState({});
  const [updateOpen, setUpdateOpen] = useState(false);
  const onUpdate = async (values) => {
    let {data:{code}} = await service.put('/updateUser/'+formValues._id,values)
    if(code===200){
      getUserData()
      setUpdateOpen(false);
    }
  };
  useEffect(()=>{
    if(updateOpen){
      updateForm.setFieldsValue(formValues)
    }else{
      setFormValues({})
    }
  },[updateOpen])

  // 用户列表
  const [userData,setUserData] = useState([])
  // 表格列
  const columns =useMemo(()=>{
    const keys = Object.keys(userData[0]|| {});
    return [...keys.slice(2,-1).map(key=>{
      return {
        title: key.charAt(0).toUpperCase() + key.slice(1),
        dataIndex: key,
        key: key,
      }
    }),{
      title: 'Action',
      key: 'action',
      render: (_,record) => (
        <Space size="middle">
          <a onClick={()=>{
            setUpdateOpen(true)
            setFormValues(record)
          }}>修改</a>
          <a onClick={()=>deleteUser(record._id)}>删除</a>
        </Space>
      ),
    },]
  },[])

  useEffect(()=>{
    getUserData()
  },[])
  // 获取用户列表
  const getUserData = async () => {
    const {data:{data}} = await service.get('/getUser')
    const dataArr = data.map((item,index)=>{
      item.birthday = moment(item.birthday).format('YYYY-MM-DD')
      return {key:index,...item}}
    )
    setUserData(dataArr)
  }
  // 删除用户
  const deleteUser = async (id)=>{
    const res = await service.delete(`/delUser/${id}`)
    if(res.data.code === 200){
      message.open({
        type: 'success',
        content: '删除成功',
      });
    }else{
      message.open({
        type: 'error',
        content: '删除失败',
      });
    }
    getUserData()
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Flex gap="middle" wrap>
    <Layout >
      <Header >Header</Header>
      <Layout>
        <Sider width="15%">
          Sider
        </Sider>
        <Content>
          <Button type="primary" onClick={()=>setOpen(true)}>添加</Button>
            <Table
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            columns={columns}
            dataSource={userData}
          />
          <Modal
            forceRender
            open={open}
            title="添加用户"
            okText="确定"
            cancelText="取消"
            okButtonProps={{
              autoFocus: true,
              htmlType: 'submit',
            }}
            onCancel={() => setOpen(false)}
            destroyOnClose
            modalRender={(dom) => (
              <Form
                layout="vertical"
                form={form}
                name="form_in_modal"
                clearOnDestroy
                onFinish={(values) => onCreate(values)}
              >
                {dom}
              </Form>
            )}
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="nickname"
              label="昵称"
              rules={[
                {
                  required: true,
                  message: '请输入昵称',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                {
                  required: true,
                  message: '请输入邮箱',
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item name="gender" label="性别" rules={[
                {
                  required: true,
                  message: '请输入邮箱',
                },
              ]}> 
              <Radio.Group>
                <Radio value="男">男</Radio>
                <Radio value="女">女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="birthday"
              label="生日"
              rules={[
                {
                  required: true,
                  message: '请输入生日',
                },
              ]}
            >
              <Input type='date'/>
            </Form.Item>
          </Modal>
          <Modal
            forceRender
            open={updateOpen}
            title="修改用户"
            okText="确定"
            cancelText="取消"
            okButtonProps={{
              autoFocus: true,
              htmlType: 'submit',
            }}
            onCancel={() => setUpdateOpen(false)}
            destroyOnClose
            modalRender={(dom) => (
              <Form
                layout="vertical"
                form={updateForm}
                name="form_in_modal_update"
                initialValues={formValues}
                clearOnDestroy
                onFinish={(values) => onUpdate(values)}
              >
                {dom}
              </Form>
            )}
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="nickname"
              label="昵称"
              rules={[
                {
                  required: true,
                  message: '请输入昵称',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                {
                  required: true,
                  message: '请输入邮箱',
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item name="gender" label="性别" rules={[
                {
                  required: true,
                  message: '请输入邮箱',
                },
              ]}> 
              <Radio.Group>
                <Radio value="男">男</Radio>
                <Radio value="女">女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="birthday"
              label="生日"
              rules={[
                {
                  required: true,
                  message: '请输入生日',
                },
              ]}
            >
              <Input type='date'/>
            </Form.Item>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  </Flex>
  )
}
