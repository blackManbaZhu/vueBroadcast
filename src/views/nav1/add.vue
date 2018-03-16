<template>
	<div>
		<el-button type="primary" style="margin-top:15px;" @click="handleAdd()">添加设备</el-button>
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
					<el-tooltip content="编辑设备" placement="left" effect="dark">
						<el-button @click="handleEdit(scope.row)" type="text" size="small"><i class="el-icon-edit"></i></el-button>
					</el-tooltip>
					<el-tooltip content="删除设备" placement="right" effect="dark">
						<el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small"><i style="fon-size:18px;" class="el-icon-delete"></i></el-button>
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
		<el-dialog :title="title" :visible.sync="dialogAddVisible">
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
									<el-option label="无线" value="无线"></el-option>
									<el-option label="有线" value="有线"></el-option>
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
								<el-button @click="handlePoint()" type="primary" plain>打开地图选择</el-button>
							</el-form-item>
						</div>
					</el-col>
					<div id="allmap" v-show="MapShow"></div>
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
			var flag;
			var myreg = /^[1][1,2,3,4,5,7,8,9][0-9]{9}$/;  
			if (!myreg.test(number) && number != ''){  
				flag = false;  
			} else {  
				flag =  true;  
			}
			return flag;
		},
		//经度
		lineStart(number){
			var flag;
			var myreg = /^-?(?:(?:180(?:\.0{1,5})?)|(?:(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d{1,6})?))$/;
			if (!myreg.test(number) && number != '') {  
				flag = false;  
			} else {  
				flag = true;  
			}
			return flag;
		},
		//纬度
		lineEnd(number){
			var flag;
			var myreg = /^-?(?:90(?:\.0{1,5})?|(?:[1-8]?\d(?:\.\d{1,6})?))$/;
			if (!myreg.test(number) && number != '') {  
				flag = false;  
			} else {  
				flag = true;  
			}
			return flag;
		}
	};
	var localData = {
		save(key,value){
			sessionStorage.setItem(key,JSON.stringify(value));
		},
		getData(key){
			return JSON.parse(sessionStorage.getItem(key)) || [];
		}
	}	
	let data = localData.getData('testList');
	export default {
		 data() {
			const total       = data.length;
			return {
				formLabelWidth:'80px',
				dialogAddVisible:false,
				MapShow:false,
				tableData: data,
				tableBefore:[],
				currentPage:'',
				title:'',
				editIndex:'',
				editObj:'',
				pageInfo:{
					total:total,
					// currentPage: currentPage,
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
			this.tableData = data.slice(0,10);
		},
		watch:{
				//深监控
				tableData:{
					handler() {
						localData.save("testList",this.tableData);
					},
					deep:true
				},
				tableBefore:{
					handler() {
						this.tableData = this.tableBefore.slice(0,10);
					}
				}
			},
		methods: {
			handleCurrentChange(val) {
				this.currentPage = val;
				// console.log(`当前页: ${val}`);
				const countStart = val*10 -10;
        		const countEnd   = val*10;
				this.tableData   = data.slice(countStart,countEnd);
			},
			handleAdd() {
				this.dialogAddVisible = true;
				this.MapShow = false;
				this.title = "添加设备";
				this.form = {};
				this.form.phone = '';
				this.form.lineStart = '';
				this.form.lineEnd = '';
			},
			handleEdit(row) {
				this.editObj = row;
				this.dialogAddVisible = true;
				this.MapShow = false;
				this.title = "编辑设备";
				this.form.number = row.number;
				this.form.name   = row.name;
				this.form.networkType = row.networkType;
				this.form.phone = row.phone;
				this.form.lineStart = row.lineStart;
				this.form.lineEnd   = row.lineEnd;
				this.form.tissue = row.tissue;
			},
			Save(form) {
				this.$refs[form].validate((valid) => {
					let flag1= verify.phone(this.form.phone);
					let flag2= verify.lineStart(this.form.lineStart);
					let flag3= verify.lineEnd(this.form.lineEnd);
					if (valid) {
						if( !flag1 ) {
							this.$message.error('手机号格式不正确！！！');
							return false;
						}
						if( !flag2 && !flag3 ){
							this.$message.error('经纬度格式不正确！！！');
							return false;
						}
						if(this.title == '添加设备'){
							this.tableData.push({
								number: this.form.number,
								name: this.form.name,
								networkType: this.form.networkType,
								phone:this.form.phone,
								lineStart:this.form.lineStart,
								lineEnd:this.form.lineEnd,
								tissue:this.form.tissue
							})
							this.pageInfo.total = this.tableData.length;
							this.dialogAddVisible = false;
							this.form = {};
							this.form.phone = ''
						}else if(this.title == "编辑设备") {
							this.editObj.number = this.form.number;
							this.editObj.name = this.form.name;
							this.editObj.networkType = this.form.networkType;
							this.editObj.phone = this.form.phone;
							this.editObj.lineStart = this.form.lineStart;
							this.editObj.lineEnd = this.form.lineEnd;
							this.editObj.tissue = this.form.tissue;
							this.dialogAddVisible = false;
						}
						this.MapShow = false;
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
			},
			handleDelete(index, row) {
				let idx = data.indexOf(row);
				data.splice(idx,1);
				this.tableBefore    = data;
				this.pageInfo.total = data.length;
				if(this.currentPage > 1) {
					const countStart = this.currentPage*10 -10;
        			const countEnd   = this.currentPage*10;
					this.tableBefore = data.slice(countStart,countEnd)
				}
			 },
			handlePoint() {
				// 百度地图API功能
				this.MapShow = true;
				var _this = this;
				var map = new BMap.Map("allmap");
				var point = new BMap.Point(118.803625,32.04);
				map.centerAndZoom(point,12);
				var geoc = new BMap.Geocoder();    
				map.addEventListener("click", function(e){        
					var pt = e.point;
					console.log(pt); 
					_this.MapShow = false; 
					_this.form.lineStart = pt['lng'];   
					_this.form.lineEnd = pt["lat"];
				});
			}
		},
	}
</script>
 <style>
	#allmap {width:100%;height:500px;}
 </style>
 