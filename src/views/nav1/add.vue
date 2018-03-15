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
					prop="lineStart"
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
			<el-form :model="form" :rules="rules" ref="form" :label-position="'right'">
				<el-row :gutter="60">
					<el-col :span="8">
						<div class="grid-content bg-purple">
							<el-form-item label="设备编号" :label-width="formLabelWidth" prop="number">
								<el-input v-model="form.number" auto-complete="off"></el-input>
							</el-form-item>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple-light">
							<el-form-item label="设备名称" :label-width="formLabelWidth" prop="name">
								<el-input v-model="form.name" auto-complete="off"></el-input>
							</el-form-item>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="60">
					<el-col :span="8">
						<div class="grid-content bg-purple">
							<el-form-item label="网络类型" :label-width="formLabelWidth" prop="networkType">
								<el-select v-model="form.networkType" placeholder="请选择网络类型">
									<el-option label="无线" value="wuxian"></el-option>
									<el-option label="有线" value="youxian"></el-option>
								</el-select>
    						</el-form-item>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple-light">
							<el-form-item label="手机号" :label-width="formLabelWidth" >
								<el-input @blur="verifyPhone()" v-model="form.phone" auto-complete="off"></el-input>
							</el-form-item>
						</div>
					</el-col>
				</el-row>
				<el-row >
					<el-col :span="6">
						<div class="grid-content bg-purple">
							<el-form-item label="经纬度" :label-width="formLabelWidth" prop="lineStart">
								<el-input @blur="verifyLine" v-model="form.lineStart" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="" :label-width="formLabelWidth" prop="lineEnd">
								<el-input @blur="verifyLine" v-model="form.lineEnd" auto-complete="off"></el-input>
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
							<el-form-item label="所属机构" :label-width="formLabelWidth" prop="tissue">
								<!-- <el-input v-model="form.name" auto-complete="off"></el-input> -->
								<el-cascader  v-model="form.tissue"
								:options="options"
								:show-all-levels="false"
								change-on-select
								></el-cascader>
							</el-form-item>
						</div>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogAddVisible = false">取 消</el-button>
				<el-button type="primary" @click="Save('form')">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
	import { msgData } from '../../api/api';
	let verify = {
		phone (number){
			console.log(number)
			var flag;
			var myreg = /^[1][1,2,3,4,5,7,8,9][0-9]{9}$/;  
			if (!myreg.test(number)) {  
				return false;  
			} else {  
				return  true;  
			}
			// return flag;
		},
		//经度
		lineStart(number){
			var flag;
			var myreg = /^[\-\+]?(0?\d{1,2}\.\d{1,5}|1[0-7]?\d{1}\.\d{1,5}|180\.0{1,5})$/;
			if (!myreg.test(number)) {  
				flag = false;  
			} else {  
				flag = true;  
			}
			return flag;
		},
		//纬度
		lineEnd(number){
			var flag;
			var myreg = /^[\-\+]?([0-8]?\d{1}\.\d{1,5}|90\.0{1,5})$/;
			if (!myreg.test(number)) {  
				flag = false;  
			} else {  
				flag = true;  
			}
			return flag;
		}
	}
	let testList = [
					{
						id:'1',
						number: '001',
						name: '设备1',
						networkType: '有线',
						phone:'18079071115',
						lineStart:'23.03',
						lineEnd:'113.75',
						tissue:'机构1'
					}, 
					{
						id:'2',
						number: '002',
						name: '设备2',
						networkType: '无线',
						phone:'18079071115',
						lineStart:'23.03',
						lineEnd:'113.75',
						tissue:'机构1'
					}, 
					{
						id:'3',
						number: '003',
						name: '设备3',
						networkType: '无线',
						phone:'18079071115',
						lineStart:'23.03',
						lineEnd:'113.75',
						tissue:'机构1'
					}, 
					{
						id:'4',
						number: '004',
						name: '设备4',
						networkType: '无线',
						phone:'18079071115',
						lineStart:'23.03',
						lineEnd:'113.75',
						tissue:'机构1'
					}, 
					{
						id:'5',
						number: '005',
						name: '设备005',
						networkType: '无线',
						phone:'18079071115',
						lineStart:'23.03',
						lineEnd:'113.75',
						tissue:'机构1'
					}, 
					{
						id:'4',
						number: '006',
						name: '设备006',
						networkType: '无线',
						phone:'18079071115',
						lineStart:'23.03',
						lineEnd:'113.75',
						tissue:'机构1'
					}, 
					{
						id:'4',
						number: '007',
						name: '设备007',
						networkType: '无线',
						phone:'18079071115',
						lineStart:'23.03',
						lineEnd:'113.75',
						tissue:'机构1'
					}, 
					{
						id:'4',
						number: '008',
						name: '设备008',
						networkType: '无线',
						phone:'18079071115',
						lineStart:'23.03',
						lineEnd:'113.75',
						tissue:'机构1'
					}, 
					{
						id:'4',
						number: '009',
						name: '设备009',
						networkType: '无线',
						phone:'18079071115',
						lineStart:'23.03',
						lineEnd:'113.75',
						tissue:'机构1'
					}, 
					{
						id:'4',
						number: '010',
						name: '设备010',
						networkType: '无线',
						phone:'18079071115',
						lineStart:'23.03',
						lineEnd:'113.75',
						tissue:'机构1'
					}, 
					{
						id:'4',
						number: '011',
						name: '设备011',
						networkType: '无线',
						phone:'18079071115',
						lineStart:'23.03',
						lineEnd:'113.75',
						tissue:'机构1'
					}, 
					{
						id:'4',
						number: '012',
						name: '设备012',
						networkType: '无线',
						phone:'18079071115',
						lineStart:'23.03',
						lineEnd:'113.75',
						tissue:'机构1'
					}, 
					{
						id:'4',
						number: '013',
						name: '设备013',
						networkType: '无线',
						phone:'18079071115',
						lineStart:'23.03',
						lineEnd:'113.75',
						tissue:'机构1'
					},
					{
						id:'4',
						number: '014',
						name: '设备014',
						networkType: '无线',
						phone:'18079071115',
						lineStart:'23.03',
						lineEnd:'113.75',
						tissue:'机构1'
					},
					{
						id:'4',
						number: '015',
						name: '设备015',
						networkType: '无线',
						phone:'18079071115',
						lineStart:'23.03',
						lineEnd:'113.75',
						tissue:'机构1'
					},
					{
						id:'4',
						number: '016',
						name: '设备016',
						networkType: '无线',
						phone:'18079071115',
						lineStart:'23.03',
						lineEnd:'113.75',
						tissue:'机构1'
					},
					{
						id:'4',
						number: '017',
						name: '设备017',
						networkType: '无线',
						phone:'18079071115',
						lineStart:'23.03',
						lineEnd:'113.75',
						tissue:'机构1'
					},
					{
						id:'4',
						number: '018',
						name: '设备018',
						networkType: '无线',
						phone:'18079071115',
						lineStart:'23.03',
						lineEnd:'113.75',
						tissue:'机构1'
					},
					{
						id:'4',
						number: '019',
						name: '设备19',
						networkType: '无线',
						phone:'18079071115',
						lineStart:'23.03',
						lineEnd:'113.75',
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
					lineStart:'',
					lineEnd:'',
					tissue:[]
				},
				tableData: testList,
				options: [{
					value: '机构一',
					label: '机构一',
					children: [{
						value: '二级机构',
						label: '二级机构',
						children: [{
							value: '三级机构',
							label: '三级机构'
						},{
							value: '三级机构',
							label: '三级机构'
						},{
							value: '三级机构',
							label: '三级机构'
						},{
							value: '三级机构',
							label: '三级机构'
						}]
					}]
				}],
				rules: {
					name: [
						{ required: true, message: '请输入设备名称', trigger: 'blur' }
					],
					number: [
						{ required: true, message: '请输入设备编号', trigger: 'blur' }
					],
					networkType: [
						{ required: true, message: '请选择网络类型', trigger: 'change' }
					],
					lineStart: [
						{ required: true, message: '请输入经度', trigger: 'blur' }
					],
					lineEnd: [
						{ required: true, message: '请输入纬度', trigger: 'blur' }
					],
					tissue: [
						{ required: true, message: '请选择所属机构', trigger: 'change' }
					]
            	}
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
			},
			Save(form) {
				this.$refs[form].validate((valid) => {
					let flag1= verify.phone(this.form.phone);
					let flag2= verify.lineStart(this.form.lineStart);
					let flag3= verify.lineEnd(this.form.lineEnd);
					console.log(flag1)
					if (valid && flag1 && flag2 && flag3) {
						testList.push({
							number: this.form.number,
							name: this.form.name,
							networkType: this.form.networkType,
							phone:this.form.phone,
							lineStart:this.form.lineStart,
							lineEnd:this.form.lineEnd,
							tissue:this.form.tissue
						})
						this.tableData = testList.slice(0,10);
						this.pageInfo.total = testList.length;
						this.dialogAddVisible = false;
						this.form = {};
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			verifyPhone() {
				let flag1= verify.phone(this.form.phone);
				if(!flag1){
					this.$message.error('手机号格式不正确！！！');
				}
			},
			verifyLine(form) {
				let flag1= verify.lineStart(this.form.lineStart);
				let flag2= verify.lineEnd(this.form.lineEnd);
				if(!flag1){
					this.$message.error('经度格式不正确！！！');
				}
				if(!flag2){
					this.$message.error('纬度格式不正确！！！');
				}
			}
		},
	}
</script>
