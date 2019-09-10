<template>
  <div>
    <div class="pagecontainer container mx-auto">
      <div class="row justify-content-center">
        <table class="table cart-table col-11 col-sm-10 col-xl-8 mx-auto mb-5 p-3">
          <thead class="thead-dark">
            <th>個人資訊</th>
          </thead>
          <tbody class="p-3">
            <td>
              <div class="form-group">
                <label>您的大名/暱稱</label>
                <input type="text" class="form-control" placeholder="留下帥氣的大名！">
              </div>
              <div class="form-group">
                <label>電子信箱</label>
                <input type="text" class="form-control" placeholder="會再發 mail 喔">
              </div>
            </td>
          </tbody>
        </table>
      </div>
      <div class="row justify-content-center">
        <table class="table cart-table col-11 col-sm-10 col-xl-8 mx-auto mb-5 p-3">
          <thead class="thead-dark">
            <th>商品資訊</th>
          </thead>
          <tbody class="p-3">
            <td>
              <div class="row">
                <div class="col-12 col-md-8">
                  <div class="form-group">
                    <label for="title">商品名稱</label>
                    <input type="text" class="form-control" id="title"
                      placeholder="就用這名字決勝負吧！" >
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <label class="input-group-text">商品分類</label>
                        </div>
                        <select class="custom-select">
                          <option selected>請選擇類別</option>
                          <option value="文具">文具</option>
                          <option value="飾品">飾品</option>
                          <option value="玩具">玩具</option>
                          <option value="其它">其它</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group col-md-6">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">單位</span>
                        </div>
                        <input type="text" class="form-control">
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="origin_price">定價</label>
                      <input type="number" class="form-control" id="origin_price"
                        placeholder="還記得原本的價錢嗎？" >
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input type="number" class="form-control" id="price"
                        placeholder="想賣多少呢？">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="description">商品敘述</label>
                    <textarea type="text" class="form-control" id="description"
                      placeholder="在這盡情的宣傳您的商品" ></textarea>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">存貨</span>
                      </div>
                      <input type="number" placeholder="有多少存量呢？" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-4">
                  <h6>放上最漂亮的一張照片吧</h6>
                  <div class="form-group">
                    <label for="image">圖片網址</label>
                    <input type="text" class="form-control" placeholder="請輸入圖片連結">
                  </div>
                  <span>上傳圖片</span>
                  <span class="form-group">
                    <label class="updata_icon ml-1" for="customFile">
                    <i class="fas fa-file-upload"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control"
                      ref="files" style="display:none">
                  </span>
                </div>
              </div>
            </td>
          </tbody>
          <tfoot class="text-center">
            <button type="button" class="btn btn-outline-dark mb-3" @click="goout">決定好了！</button>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goout () {
      const message = '練習用並未開放<(_ _)>'
      const status = 'danger'
      this.$store.dispatch('messagePush', { message, status })
    }
  }
}
</script>
