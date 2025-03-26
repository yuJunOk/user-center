import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { ProFormSelect } from '@ant-design/pro-form/lib';
import { Button } from 'antd';

type AddUserModalProps = {
  onFinish: (values: API.AddUserFromData) => Promise<boolean>;
}

const AddUserModal: React.FC<AddUserModalProps> = (props) => {
  return (
    <ModalForm
      title="新建用户表单"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建
        </Button>
      }
      width={400}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
        onCancel: () => console.log('run'),
      }}
      onFinish={props.onFinish}
    >
      <ProFormText width="md" name="userName" label="用户名" />
      <ProFormText
        width="md"
        name="loginName"
        label="用户账户"
        rules={[{ required: true, message: '请输入用户账户' }]}
      />
      <ProFormText
        width="md"
        name="loginPwd"
        label="用户密码"
        rules={[{ required: true, message: '请输入用户密码' }]}
      />
      <ProFormSelect
        width="md"
        name="gender"
        label="性别"
        valueEnum={{
          0: '女',
          1: '男',
        }}
      />
      <ProFormSelect
        width="md"
        name="userRole"
        label="角色"
        valueEnum={{
          0: '普通用户',
          1: '管理员',
        }}
      />
      <ProFormText width="md" name="phone" label="电话" />
      <ProFormText width="md" name="email" label="邮件" />
    </ModalForm>
  );
};

export default AddUserModal;
