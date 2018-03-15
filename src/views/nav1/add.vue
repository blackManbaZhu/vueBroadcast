<template>
	<div>
		<el-button style="margin-top:15px;" @click="dialogAddVisible = true">添加设备</el-button>
		<el-table
			:data="tableData"
			border
			style="width: 100%;margin-top:15px;">
				<el-table-column
					prop="name"
					label="设备名称"
					width="180">
				</el-table-column>
				<el-table-column
					prop="number"
					label="设备编号"
					width="180">
				</el-table-column>
				<el-table-column
					prop="networkType"
					label="网络类型">
				</el-table-column>
				<el-table-column
					prop="phone"
					label="手机号">
				</el-table-column>
				<el-table-column
					prop="line"
					label="经纬度">
				</el-table-column>
				<el-table-column
					prop="tissue"
					label="所属机构">
				</el-table-column>
				 <el-table-column
					fixed="right"
					label="操作"
					width="100">
					<template slot-scope="scope">
					<el-tooltip content="编辑设备" placement="top" effect="dark">
						<el-button type="text" size="small"><i style="font-size:20px;" class="el-icon-edit"></i></el-button>
					</el-tooltip>
					<el-tooltip content="删除设备" placement="top" effect="dark">
						<el-button type="text" size="small"><i style="font-size:20px;" class="el-icon-delete"></i></el-button>
					</el-tooltip>
					</template>
				</el-table-column>
		</el-table>
		 <el-pagination
		 style="margin-top:15px;float:right;"
		 	background
			@current-change="handleCurrentChange"
			:page-size="10"
			layout="total, prev, pager, next, jumper"
			:total="pageInfo.total">
		</el-pagination>
		<!-- 添加设备 弹窗 -->
		<el-dialog title="添加设备" :visible.sync="dialogAddVisible">
			<el-form :model="form" :label-position="'left'">
				<el-row :gutter="60">
					<el-col :span="8">
						<div class="grid-content bg-purple">
							<el-form-item label="设备编号" :label-width="formLabelWidth">
								<el-input v-model="form.number" auto-complete="off"></el-input>
							</el-form-item>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple-light">
							<el-form-item label="设备名称" :label-width="formLabelWidth">
								<el-input v-model="form.name" auto-complete="off"></el-input>
							</el-form-item>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="60">
					<el-col :span="8">
						<div class="grid-content bg-purple">
							<el-form-item label="网络类型" :label-width="formLabelWidth">
								<el-select v-model="form.networkType" placeholder="请选择网络类型">
									<el-option label="无线" value="wuxian"></el-option>
									<el-option label="有线" value="youxian"></el-option>
								</el-select>
    						</el-form-item>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple-light">
							<el-form-item label="手机号" :label-width="formLabelWidth">
								<el-input v-model="form.phone" auto-complete="off"></el-input>
							</el-form-item>
						</div>
					</el-col>
				</el-row>
				<el-row >
					<el-col :span="6">
						<div class="grid-content bg-purple">
							<el-form-item label="经纬度" :label-width="formLabelWidth">
								<el-input v-model="form.name" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="" :label-width="formLabelWidth">
								<el-input v-model="form.name" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="" :label-width="formLabelWidth">
								<el-button type="primary" plain>选择</el-button>
							</el-form-item>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="60">
					<el-col :span="8">
						<div class="grid-content bg-purple">
							<el-form-item label="所属机构" :label-width="formLabelWidth">
								<!-- <el-input v-model="form.name" auto-complete="off"></el-input> -->
								<el-cascader
								:options="options"
								:show-all-levels="false"
								v-model="form.tissue"
								></el-cascader>
							</el-form-item>
						</div>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogAddVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogAddVisible = false">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
	import { msgData } from '../../api/api';
	let testList = [
					{
						id:'1',
						number: '001',
						name: '设备1',
						networkType: '有线',
						phone:'18079071115',
						line:'-23.03,-113.75',
						tissue:'机构1'
					}, 
					{
						id:'2',
						number: '002',
						name: '设备2',
						networkType: '无线',
						phone:'18079071115',
						line:'-23.03,-113.75',
						tissue:'机构1'
					}, 
					{
						id:'3',
						number: '003',
						name: '设备3',
						networkType: '无线',
						phone:'18079071115',
						line:'-23.03,-113.75',
						tissue:'机构1'
					}, 
					{
						id:'4',
						number: '004',
						name: '设备4',
						networkType: '无线',
						phone:'18079071115',
						line:'-23.03,-113.75',
						tissue:'机构1'
					}, 
					{
						id:'5',
						number: '005',
						name: '设备005',
						networkType: '无线',
						phone:'18079071115',
						line:'-23.03,-113.75',
						tissue:'机构1'
					}, 
					{
						id:'4',
						number: '006',
						name: '设备006',
						networkType: '无线',
						phone:'18079071115',
						line:'-23.03,-113.75',
						tissue:'机构1'
					}, 
					{
						id:'4',
						number: '007',
						name: '设备007',
						networkType: '无线',
						phone:'18079071115',
						line:'-23.03,-113.75',
						tissue:'机构1'
					}, 
					{
						id:'4',
						number: '008',
						name: '设备008',
						networkType: '无线',
						phone:'18079071115',
						line:'-23.03,-113.75',
						tissue:'机构1'
					}, 
					{
						id:'4',
						number: '009',
						name: '设备009',
						networkType: '无线',
						phone:'18079071115',
						line:'-23.03,-113.75',
						tissue:'机构1'
					}, 
					{
						id:'4',
						number: '010',
						name: '设备010',
						networkType: '无线',
						phone:'18079071115',
						line:'-23.03,-113.75',
						tissue:'机构1'
					}, 
					{
						id:'4',
						number: '011',
						name: '设备011',
						networkType: '无线',
						phone:'18079071115',
						line:'-23.03,-113.75',
						tissue:'机构1'
					}, 
					{
						id:'4',
						number: '012',
						name: '设备012',
						networkType: '无线',
						phone:'18079071115',
						line:'-23.03,-113.75',
						tissue:'机构1'
					}, 
					{
						id:'4',
						number: '013',
						name: '设备013',
						networkType: '无线',
						phone:'18079071115',
						line:'-23.03,-113.75',
						tissue:'机构1'
					},
					{
						id:'4',
						number: '014',
						name: '设备014',
						networkType: '无线',
						phone:'18079071115',
						line:'-23.03,-113.75',
						tissue:'机构1'
					},
					{
						id:'4',
						number: '015',
						name: '设备015',
						networkType: '无线',
						phone:'18079071115',
						line:'-23.03,-113.75',
						tissue:'机构1'
					},
					{
						id:'4',
						number: '016',
						name: '设备016',
						networkType: '无线',
						phone:'18079071115',
						line:'-23.03,-113.75',
						tissue:'机构1'
					},
					{
						id:'4',
						number: '017',
						name: '设备017',
						networkType: '无线',
						phone:'18079071115',
						line:'-23.03,-113.75',
						tissue:'机构1'
					},
					{
						id:'4',
						number: '018',
						name: '设备018',
						networkType: '无线',
						phone:'18079071115',
						line:'-23.03,-113.75',
						tissue:'机构1'
					},
					{
						id:'4',
						number: '019',
						name: '设备19',
						networkType: '无线',
						phone:'18079071115',
						line:'-23.03,-113.75',
						tissue:'机构1'
					}
				]
	export default {
		 data() {
			const total       = testList.length;
			const currentPage = Math.floor(total/10); 
			return {
				formLabelWidth:'80px',
				dialogAddVisible:false,
				pageInfo:{
					total:total,
					currentPage: currentPage,
				},
				form:{
					number: '',
					name: '',
					networkType: '',
					phone:'',
					line:'',
					tissue:''
				},
				tableData: [],
				options: [{
					value: 'zhinan',
					label: '指南',
					children: [{
						value: 'shejiyuanze',
						label: '设计原则',
						children: [{
							value: 'yizhi',
							label: '一致'
						}, {
							value: 'fankui',
							label: '反馈'
						}, {
							value: 'xiaolv',
							label: '效率'
						}, {
							value: 'kekong',
							label: '可控'
						}]
					}]
				}]
			}
		},
		created() {
			this.tableData = testList.slice(0,10);
		},
		methods: {
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				const countStart = val*10 -10;
        		const countEnd   = val*10;
				this.tableData= testList.slice(countStart,countEnd)
			}
		},
	}
</script>
