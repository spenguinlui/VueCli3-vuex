<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <!-- 當isLoading 為true啟用，false停用 -->
        <h3 class="my-4">產品管理</h3>
        <div class="text-right mt-4">
            <button class="btn btn-success" type="button" @click="openModal(true)">新增商品</button>
        </div>
    <!-- 產品列表 -->
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width="120">分類</th>
                    <th>產品名稱</th>
                    <th width="120">賣家</th>
                    <th class="text-right" width="120">原價</th>
                    <th class="text-right" width="120">售價</th>
                    <th class="text-right" width="120">數量</th>
                    <th class="text-center" width="100">審核</th>
                    <th class="text-center" width="140">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in products" :key="item.id">
                    <td>{{ item.category }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.content }}</td>
                    <td class="text-right">{{ item.origin_price | currency }}</td>
                    <td class="text-right">{{ item.price | currency }}</td>
                    <td class="text-right">{{ item.stock}}</td>
                    <td class="text-center">
                        <span v-if="item.is_enabled == 1" class="text-success">通過</span>
                        <span v-else class="text-danger">未通過</span>
                    </td>
                    <td>
                        <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
                        <button type="button" class="btn btn-outline-danger btn-sm" @click="delModal(item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    <!-- 產品列表 -->
    <!-- 分頁元件 -->
        <Pagination id="pagination" :pages="pagination" v-on:emitpage="getProducts"></Pagination>
    <!-- 動態綁定pagination到pages上，元件上在用props連接 -->
    <!-- 在元件上用$emit向上傳遞時在傳到emitpage上 -->
    <!-- 分頁元件 -->
    <!-- 商品建立Model -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true" @keydown.enter="updateProduct">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>新增產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="image">輸入圖片網址</label>
                                    <input type="text" class="form-control" id="image"
                                    placeholder="請輸入圖片連結" v-model="tempProducts.imageUrl">
                                </div>
                                <div class="form-group">
                                    <label for="customFile">或 上傳圖片
                                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                                    </label>
                                    <input type="file" id="customFile" class="form-control"
                                    ref="files" @change="uploadFile">
                                </div>
                                <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                                    class="img-fluid" :src="tempProducts.imageUrl" alt="">
                            </div>
                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label for="title">標題</label>
                                    <input type="text" class="form-control" id="title"
                                    placeholder="請輸入標題" v-model="tempProducts.title">
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                    <label for="category">分類</label>
                                    <input type="text" class="form-control" id="category"
                                        placeholder="請輸入分類" v-model="tempProducts.category">
                                    </div>
                                    <div class="form-group col-md-6">
                                    <label for="price">單位</label>
                                    <input type="unit" class="form-control" id="unit"
                                        placeholder="請輸入單位" v-model="tempProducts.unit">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                    <label for="origin_price">原價</label>
                                    <input type="number" class="form-control" id="origin_price"
                                        placeholder="請輸入原價" v-model="tempProducts.origin_price">
                                    </div>
                                    <div class="form-group col-md-6">
                                    <label for="price">售價</label>
                                    <input type="number" class="form-control" id="price"
                                        placeholder="請輸入售價" v-model="tempProducts.price">
                                    </div>
                                </div>
                                <hr>
                                <div class="form-group">
                                    <label for="description">產品描述</label>
                                    <textarea type="text" class="form-control" id="description"
                                    placeholder="請輸入產品描述" v-model="tempProducts.description"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="content">提供者/賣家</label>
                                    <input type="text" class="form-control" id="content"
                                    placeholder="請輸入提供者/賣家" v-model="tempProducts.content">
                                </div>
                                <div class="form-group">
                                    <label for="email">賣家信箱</label>
                                    <input type="text" class="form-control" id="email"
                                    placeholder="請輸入提供者/賣家" v-model="tempProducts.email">
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <div class="form-check">
                                        <input class="form-check-input" type="checkbox"
                                            id="is_enabled" v-model="tempProducts.is_enabled"
                                            :true-value="1" :false-value="0"
                                            >
                                        <label class="form-check-label" for="is_enabled">
                                            是否上架
                                        </label>
                                        </div>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label class="d-inline-block pr-3" for="stock">庫存</label>
                                        <input type="number" value="0" style="width:80px" class="d-inline-block form-control" id="stock"
                                            placeholder="數量" v-model="tempProducts.stock">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                    </div>
                </div>
            </div>
        </div>
    <!-- 商品建立Model -->
    <!-- 刪除商品Modal -->
        <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>刪除產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    是否刪除 <strong class="text-danger">{{ tempProducts.title }}</strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" @click="delProduct">確認刪除</button>
                    </div>
                </div>
            </div>
        </div>
    <!-- 刪除商品Modal -->
    </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/pagination'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      tempProducts: {},
      isNew: false,
      status: {
        fileUploading: false
      }
    }
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('backModules', ['products', 'pagination'])
  },
  components: {
    Pagination
  },
  methods: {
    getProducts (page = 1) {
      this.$store.dispatch('backModules/getBProducts', page)
    },
    openModal (isNew, item) {
      if (isNew) {
        this.isNew = true
      } else {
        this.tempProducts = item
        this.isNew = false
      }
      $('#productModal').modal('show')
    },
    delModal (item) {
      this.tempProducts = item
      $('#delProductModal').modal('show')
    },
    delProduct () {
      this.$store.dispatch('backModules/delProduct', this.tempProducts.id)
      $('#delProductModal').modal('hide')
    },
    uploadFile () {
      const uploadedFile = this.$refs.files.files[0]
      const vm = this
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      this.$store.dispatch('backModules/uploadFile', { formData, vm })
    },
    updateProduct () {
      const vm = this
      let httpMethod = 'post'
      if (!vm.isNew) {
        httpMethod = 'put'
      }
      vm.tempProducts.stock = parseInt(vm.tempProducts.stock)
      let updateFile = vm.tempProducts
      this.$store.dispatch('backModules/updateProduct', { updateFile, httpMethod })
      $('#productModal').modal('hide')
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style lang="scss">
    td {
        margin: auto;
    }
</style>
