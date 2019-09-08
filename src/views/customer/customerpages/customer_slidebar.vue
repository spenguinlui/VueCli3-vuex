<template>
    <div class="col-11 col-md-3 mt-5">
        <div class="slidebar_list mx-auto list-group sticky-top">
        <!-- all -->
            <h4 href="#" class="list-title text-center list-group-item"
                @click.prevent="allCategories">
                全部
            </h4>
        <!-- all -->
        <!-- sort -->
            <div class="list-title list-group-item">
                <h4 class="text-center collapsed" @click="isSort = !isSort" data-toggle="collapse" data-target="#slidebarList_sort" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fas fa-plus pr-3" v-if="!isSort"></i><i class="fas fa-minus pr-3" v-if="isSort"></i>商品分類</h4>
            </div>
            <div class="list-group text-center collapse" id="slidebarList_sort">
                <a href="#" class="list-group-item list-group-item-action"
                :title="accessories" @click.prevent="changeCategories(accessories)" data-toggle="list">
                    <i class="fas fa-ribbon"></i>
                    {{ this.accessories }}
                </a>
                <a href="#" class="list-group-item list-group-item-action"
                :title="toy" @click.prevent="changeCategories(toy)" data-toggle="list">
                    <i class="fas fa-robot"></i>
                    {{ this.toy }}
                </a>
                <a href="#" class="list-group-item list-group-item-action"
                :title="stationery" @click.prevent="changeCategories(stationery)" data-toggle="list">
                    <i class="fas fa-paperclip"></i>
                    {{ this.stationery }}
                </a>
                <a href="#" class="list-group-item list-group-item-action"
                :title="udo" @click.prevent="changeCategories(udo)" data-toggle="list">
                    <i class="fas fa-question"></i>
                    {{ this.udo }}
                </a>
                <a href="#" class="list-group-item list-group-item-action"
                :title="others" @click.prevent="changeCategories(others)" data-toggle="list">
                    <i class="fas fa-archive"></i>
                    {{ this.others }}
                </a>
            </div>
        <!-- sort -->
        <!-- price -->
            <div class="list-title list-group-item">
                <h4 class="text-center collapsed" @click="isPrice = !isPrice" data-toggle="collapse" data-target="#slidebarList_price" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fas fa-plus pr-3" v-if="!isPrice"></i><i class="fas fa-minus pr-3" v-if="isPrice"></i>價格分類</h4>
            </div>
            <div class="list-group text-center collapse" id="slidebarList_price">
                <a href="#" class="list-group-item list-group-item-action"
                @click.prevent="priceSort(price[0],price[1])" data-toggle="list">
                    <i class="fas fa-dollar-sign"></i>
                    {{ this.price[0] }}~{{ this.price[1] }}元
                </a>
                <a href="#" class="list-group-item list-group-item-action"
                @click.prevent="priceSort(price[2],price[3])" data-toggle="list">
                    <i class="fas fa-dollar-sign"></i>
                    {{ this.price[2] }}~{{ this.price[3] }}元
                </a>
                <a href="#" class="list-group-item list-group-item-action"
                @click.prevent="priceSort(price[4],price[5])" data-toggle="list">
                    <i class="fas fa-dollar-sign"></i>
                    {{ this.price[4] }}元以上
                </a>
            </div>
        <!-- price -->
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      accessories: '飾品',
      toy: '玩具',
      udo: '不明物',
      others: '其他',
      stationery: '文具',
      price: [0, 499, 500, 999, 1000, 99999999999999],
      zero: 0,
      isSort: false,
      isPrice: false
    }
  },
  methods: {
    changeCategories (categories) {
      this.$store.commit('productsModules/CATEGORIESCHANGE', categories)
      this.$store.commit('productsModules/PAGINATION', this.zero)
    },
    priceSort (price1, price2) {
      this.$store.commit('productsModules/PRICECHANGE', { price1, price2 })
      this.$store.commit('productsModules/PAGINATION', this.zero)
    },
    allCategories (page = 1) {
      let categories = 'all'
      let price1 = this.price[0]
      let price2 = this.price[5]
      let active = document.querySelectorAll('.list-group-item-action.active')
      active.forEach(function (e) {
        e.classList.remove('active')
      })
      this.$store.commit('productsModules/CATEGORIESCHANGE', categories)
      this.$store.commit('productsModules/PRICECHANGE', { price1, price2 })
      this.$store.dispatch('productsModules/getProducts', page)
    }
  }
}
</script>
