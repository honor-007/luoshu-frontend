import {useModel} from "@@/exports";
import {PageContainer} from "@ant-design/pro-components";
import Guide from "@/components/Guide";
import {trim} from "@/utils/format";
import {Card, Layout, Space, Table, TableProps, Tag, Tree, TreeDataNode} from "antd";
import React, {useEffect, useState} from "react";
import styles from './index.module.less';
import {useRequest} from 'ahooks';
import {tree} from "@/services/system/dept/api";
import {page} from "@/services/user/api";
import {DEFAULT_CURRENT, DEFAULT_PAGESIZE} from "@/constants";


const {Header, Footer, Sider, Content} = Layout;
const User: React.FC = () => {

    const [deptTreeNode, setDeptTreeNode] = useState<any>();
    // const [data, setData] = useState<any>();
    const {
        data: tableData,
        loading: tableDataLoading,
        run: fetchTableData,
        refresh: refreshFetchTableData,
    } = useRequest(
        (params: API.PageInfo<API.User>) => page(params),
        {manual: true}
    );

    useEffect(() => {
        tree().then(res => {
            console.log("dept tree :", res)
            setDeptTreeNode(res.data)
        });
        const params: API.PageInfo<API.User> = {
            current: DEFAULT_CURRENT,
            pageSize: DEFAULT_PAGESIZE,
        }
        fetchTableData(params);
    }, [])


    const columns: TableProps<API.User>['columns'] = [
        {
            title: '登录账号',
            dataIndex: 'account',
            key: 'account',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '所属租户',
            dataIndex: 'tenantId',
            key: 'tenantId',
        },
        {
            title: '用户姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '所属角色',
            dataIndex: 'roleId',
            key: 'roleId',
        },
        {
            title: '所属部门',
            dataIndex: 'deptNames',
            key: 'deptNames',
            render: (_: any, record: any) => {
                console.log("===_==", _)
                return (_.map((item: any, index: any) => {
                    return (
                        <Tag key={index} color={"blue"}>{item}</Tag>
                    )
                }))
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <a>查看</a>
                    <a>编辑</a>
                    <a>删除</a>
                </Space>
            ),
        },
    ];

    const handleSelectNode = (selectedKeys: any, e: {
        selected: boolean,
        selectedNodes: any,
        node: any,
        event: any
    }) => {
        const params: API.PageInfo<API.User> = {
            current: DEFAULT_CURRENT,
            pageSize: DEFAULT_PAGESIZE,
            deptId: selectedKeys[0]
        }
        fetchTableData(params);
    }

    return (
        <Layout className={styles.userLayout}>
            <Sider style={{background: "white", marginRight: '1vw'}}>
                <Card className={styles.userLayoutSiderCard}>
                    <Tree treeData={deptTreeNode} blockNode onSelect={handleSelectNode}/>
                </Card>
            </Sider>
            <Content style={{background: "white"}}>
                <Card className={styles.userLayoutContentCard}>
                    <Table columns={columns} dataSource={tableData?.data?.records}/>
                </Card>
            </Content>
        </Layout>
    );
};

export default User;
