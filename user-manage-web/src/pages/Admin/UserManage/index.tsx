import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import { addUser, deleteUser, searchUsers, updateUser } from '@/services/ant-design-pro/api';
import { Image, message } from 'antd';
import AddUserModal from '@/pages/Admin/UserManage/components/AddUserModal';

const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    copyable: true,
  },
  {
    title: '用户账户',
    dataIndex: 'loginName',
    copyable: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    hideInSearch: true,
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} height={50}></Image>
      </div>
    ),
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueEnum: {
      0: { text: '女' },
      1: { text: '男' },
    },
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: '邮件',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: {
      0: { text: '正常', status: 'SUCCESS' },
      1: { text: '异常', status: 'Warning' },
    },
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: { text: '普通用户', status: 'Default' },
      1: { text: '管理员', status: 'Success' },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    //sorter: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a key="editable"
         onClick={() => {
           // @ts-ignore
           action?.startEditable?.(record.id);
         }}
      >
        编辑
      </a>,
      <a href={record.avatarUrl} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(params, sort, filter);
        const res = await searchUsers(params);
        return {
          data: Array.isArray(res?.data?.records) ? res.data.records : [],
          total: res?.data?.total ?? 0,
        };
      }}
      editable={{
        type: 'multiple',
        onSave: async (rowKey, data, row) => {
          console.log(rowKey, data, row);
          const res = await updateUser(data);
          if (res.data > 0) {
            message.success('修改用户消息成功');
          } else {
            message.success(res.details ?? res.message ?? '修改用户消息失败，请稍后再试');
          }
        },
        onDelete: async (rowKey, data) => {
          let deleteRes = await deleteUser(data.id);
          console.log(deleteRes);
          if (deleteRes.data) {
            message.success('删除成功！');
          } else {
            message.error(deleteRes.details ?? deleteRes.message ?? '删除失败，请稍后再试');
          }
        },
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value123: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="用户管理表格"
      toolBarRender={() => [
        <AddUserModal
          key="addUserModal"
          onFinish={async (values) =>{
            const res = await addUser(values);
            console.log(res);
            if (res.data) {
              message.success('添加用户信息成功！');
              actionRef.current?.reload();
              return true;
            } else {
              message.error(res.details ?? res.message ?? '添加失败，请稍后再试');
              return false;
            }
          }}
        />,
      ]}
    />
  );
};
