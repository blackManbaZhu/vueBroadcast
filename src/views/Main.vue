<template>
	<div>
		<!-- <el-button type="primary" @click="testData">获取</el-button>
		<div>
			<button>获取测试数据</button>
		</div> -->
		<div class="custom-tree-container">
			<el-button style="margin-top:15px;" @click="BtnAdd()">添加机构</el-button>
			<div class="block">
				<el-tree
					:data="dataList"
					show-checkbox
					node-key="id"
					default-expand-all
					:expand-on-click-node="false">
					<span class="custom-tree-node" slot-scope="{ node, data }">
						<span>{{ node.label }}</span>
						<span>
						<el-button
							type="text"
							size="mini"
							@click="() => append(data)">
							添加
						</el-button>
						<el-button
							type="text"
							size="mini"
							@click="() => remove(node, data)">
							删除
						</el-button>
						</span>
					</span>
    			</el-tree>
			</div>
		</div>
		<!-- 弹出框 -->
		<el-dialog title="添加主机构" :visible.sync="dialogFormVisible">
			<el-form :model="form" :rules="rules">
				<el-form-item label="机构名称" :label-width="formLabelWidth" prop="name">
					<el-input type="text" v-model="form.name" placeholder="请输入机构名"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false,parentNode = false,this.childrenNode = false">取 消</el-button>
				<el-button type="primary" @click ="add(form.name)">添 加</el-button>
			</div>
		</el-dialog>
		<!-- 确认删除提示框 -->
		<el-dialog
			title="提示"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose">
			<span>确认删除此机构吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
   	import { msgData } from '../api/api';
	let id = 100;
	var localData = {
			//保存  相当于是一个map对象 有key值和value值 
			save(key,value){
				localStorage.setItem(key,JSON.stringify(value));
			},
			//获取localstorage 中的数据
			getData(key){
				return JSON.parse(localStorage.getItem(key)) || [];
			}
		}
	export default {
		components: {
		},
		data () {
			const data = localData.getData('data-list');
			// [
			// 	{
			// 		id: 1,
			// 		label: '主机构',
			// 		children: [
			// 			{
			// 				id: 4,
			// 				label: '二级机构',
			// 				children: [
			// 					{
			// 						id: 9,
			// 						label: '三级机构'
			// 					},
			// 					{
			// 						id: 10,
			// 						label: '三级机构'
			// 					}
			// 				]
			// 			}
			// 		]
			// 	},
			// 	{
			// 		id: 2,
			// 		label: '主机构',
			// 		children: [
			// 			{
			// 			id: 4,
			// 			label: '二级机构',
			// 			children: [
			// 				{
			// 					id: 9,
			// 					label: '三级机构'
			// 				},
			// 				{
			// 					id: 10,
			// 					label: '三级机构'
			// 				}
			// 			]
			// 		}]
			// 	}
			// ];
			return {
				childrenData:[],
				disabl:true,
				parentNode:false,
				childrenNode:false,
				dialogVisible:false,
				dialogFormVisible: false,
				formLabelWidth: '80px',
				dataList: JSON.parse(JSON.stringify(data)),
				form:{
					name:''
				},
				rules: {
					name: [
						{ required: true, message: '请输入机构名称', trigger: 'blur' }
					]
				}
			};
		},
		watch:{
				//监听的动作为 当todoList发生变化的时候 执行回调函数
				//深监控
				dataList:{
					handler:function(){
						localData.save("data-list",this.dataList);
					}, 
					deep:true
				}
			},
		methods: {
			append(data) {
				this.parentNode        = false;
				this.childrenNode      = true;
				this.dialogFormVisible = true;
				this.childrenData      = data;
			},
			remove(node, data) {
				const parent   = node.parent;
				const children = parent.data.children || parent.data;
				const index = children.findIndex(d => d.id === data.id);
				children.splice(index, 1);
			},
			//按钮添加主机构
			BtnAdd() {
				this.parentNode        = true;
				this.dialogFormVisible = true;
				this.childrenNode      = false;
				let name = this.form.name;
			},
			add(formName) {
				if(formName){
					if(this.parentNode){
						let newChild   = { id: this.dataList.length+1, label:formName ,children : [] };
						this.dataList.push(newChild);
					}
					if(this.childrenNode){
						let newChild = { id: this.childrenData*10+1, label: formName, children: [] };
						if (!this.childrenData.children) {
							this.$set(this.childrenData, 'children', []);
						}
						this.childrenData.children.push(newChild);
					}
					this.form.name = '';
					this.dialogFormVisible = false;
				}else {
					this.$message.error('机构名必填，请输入！！！');
					return false;
				}
			}
		}
	}
</script>

<style>
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
	.block{
		border:1px solid #dcdfe6;
		margin-top:15px;
		padding:10px;
	}
</style>
