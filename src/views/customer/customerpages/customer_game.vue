<template>
  <div>
    <div class="modal fade" id="gameModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">尋找有緣物(？)</h4>
            <button @click.prevent="closeGame" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <span class="game-text text-muted">
              遊戲規則：在時限內翻開相同的卡片，並於時間到時結算獎勵<br/>
              翻開6組：95折優惠券<br/>
              翻開10組：90折優惠券<br/>
              全部翻開：85折優惠券<br/>
            </span>
            <div class="d-inline-block pr-2">倒數計時：</div>
            <div class="d-inline-block" v-if="minute != '' || second != ''">
              <span>{{ minute | number }}</span>
              <span>：</span>
              <span>{{ second | number }}</span>
            </div>
          </div>
          <button class="btn btn-lg btn-danger mx-auto mb-2" @click="startGame()">Start</button>
          <div class="modal-footer">
            <div class="container-fluid">
              <div class="row">
                <div class="flipcard col-3 p-1" v-for="item in imagelist" :key="item.id">
                  <div class="cardfront" :class="{'active': item.show}" @click="ongame ? flip(item) : noflip()"
                    style="height: 100px; background-size: cover; background-position: center" :style="{backgroundImage: `url(${item.imageUrl})`}">
                    <div class="cardback" :class="{'active': item.show}"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- 未點Start提醒Modal -->
      <div class="modal fade" id="plzClickStart" tabindex="-1" role="dialog">
          <div class="modal-dialog h-75 d-flex justify-content-center align-items-center" role="document">
              <div class="modal-content">
              <div class="modal-body text-center">
                  <h3 class="mb-3">Are you ready ？</h3>
                  <button type="button" class="btn btn-lg btn-danger mr-3" data-dismiss="modal" @click="startGame()">Start!!</button>
                  <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">Close</button>
              </div>
              </div>
          </div>
      </div>
  <!-- 未點Start提醒Modal -->
  <!-- 時間到Modal -->
      <div class="modal fade" id="gameOver" tabindex="-1" role="dialog">
          <div class="modal-dialog h-75 d-flex justify-content-center align-items-center" role="document">
              <div class="modal-content">
              <div class="modal-body text-center">
                  <p class="d-inline-block">遊戲結束！</p>
                  <div v-if="reward_1">
                      <p>恭喜您獲得 {{ reward1.name }}！</p>
                      <p class="text-danger">優惠券序號：{{ reward1.code }}</p>
                  </div>
                  <div v-if="reward_2">
                      <p>恭喜您獲得 {{ reward2.name }}！</p>
                      <p class="text-danger">優惠券序號：{{ reward2.code }}</p>
                  </div>
                  <div v-if="reward_3">
                      <p>恭喜您獲得 {{ reward3.name }}！</p>
                      <p class="text-danger">優惠券序號：{{ reward3.code }}</p>
                  </div>
                  <div v-if="gameover">
                      很可惜，差一點喔！
                  </div>
                  <div>＊＊購物車頁面可以查詢序號＊＊</div>
                  <button type="button" class="btn btn-dark mt-3" data-dismiss="modal">確定</button>
              </div>
              </div>
          </div>
      </div>
  <!-- 時間到Modal -->
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      imagelist: [
        {
          id: 1,
          show: false,
          parnercode: 1,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565007016179.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=pMPkOqIisoRw%2B531bywiEyW76wV0VyqS2F5iWkOLaXrQkyioQkgCUTxSuZm%2F5qv0iPVaKajv8pMhFiNPZoNxxXvUOCBbhEPr5T3CLPDw4pIkDrryeO5uSyQoCApaQnN%2FObibitkXQ2E4AjjMtOPRtPBLd6f0bQC8jPkMf4HTRBLE0bMu6jGl9O%2FNXCLu5oWa91Jacr3KlZTibsKIUZGIKk2fbD5wR%2BeKgJGI2q5D%2FaO1PyITFlKhwL4B3dlfkcwFiHo0H3jgE5ROxirOQ%2F2K3efoZunHmLCn8%2Facbk4zWaw7WJ7YX0F5STfzKTZ6ixG%2B7eVSItC1W5Gz6TVPiMqP5Q%3D%3D'
        },
        {
          id: 2,
          show: false,
          parnercode: 2,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1564303866157.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=nFVHybVa%2FN%2FXEqiboCp%2B7BdcLXhUzg8ilsEF6%2F0Dvr1j2r%2B%2Bu6hhFFsUFQYwzBciUNgv%2BFniTLqfOYlPYJ79SV%2BGcGYdvvVnB4vOGCbKhEjpUmaeT9jJ%2FNUeSPVzi%2F2Ktk2CqROCveIBCxRje2jvpvUn%2BmKNqYM3tGFqja1k32Jc0pZjoyMeGyFOxCyJTPvzTtLhb2esKHEDF1uzuyjD5a1cX%2FPHMUXa%2BiXYi%2FgjTBPH9tvI7GUjxgsBpWuHAGMaCvm%2Fne2nqtIcKlEgVA3D%2FJmpHXMUfKTAM4z0Yqd1hW1nImKwR3pqVMwOtXk8sL6URGDZgbwAqtdp8kKMVIsrNw%3D%3D'
        },
        {
          id: 3,
          show: false,
          parnercode: 3,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565006894549.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=d%2BHHdQEtdxiZkdoGIRH8RIHq8g0dnLJcOPW8cC9D%2FVk0oQzlNIBjUKlzQ4TvqElFt8bJeGXdw0O98lkZOh6ZSXkPQjzQlMHv5tyhHZpe04Lk9R6zKU5GC%2FX4VcizQu%2BOtC9eabrsFrzZhYABb9vpJMn111pb22Nsoy%2FV4U1kVec3wTz6YEhXMPBtNjoCnyrxXwCPdqrukydsYuhpIEsFAxJ%2Bg4YZcyoSk1RUdvIz1MW7sPvmNMbvyOUWFbpHH2CewDsBntT0tYt2mKYa%2FZTkz62UIuM7QckmhookIl15J%2BFEDxxSx3hfAKxjZDYXIj5sv%2FQJPEmxrzAkw8wJRTeuxw%3D%3D'
        },
        {
          id: 4,
          show: false,
          parnercode: 4,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565007277580.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=VK68KPLAZnuI32fr9XaG9T3RvbCYk12ShmkcjVW81MnA0Fj5XxjuFzfpyYf9O0tRy%2Byp82vE%2BcV3OP5fqMw3VCxw9LqmNLsOQdIx5jBpIdIx%2F1Sxblx%2FDhbpOtwfNs6Ys%2BA3aVptw7gFE4au%2FYL2C1%2BHQgyN2rYWu%2BjTi27hKEdQyJOIH8UQ0Fz93q6ad8EUjRaoseNDO02dYm9%2FwNfxlzCc7toeaFe0r9a%2F%2BHG5wqPCNexrJJN1hk%2BAMtdlGgINB7TRT6tZBgF%2BNZ2ok%2Bl%2BiGUDDOa756zr%2F4%2B%2FQnDAIYCBozi2nYAvXRBHecJpgvaG4Yc3TtAsWjP7xo6BjwDlvg%3D%3D'
        },
        {
          id: 5,
          show: false,
          parnercode: 5,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565006876881.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Unz%2FIZn9cU%2BV7L8Yv6PNmOPU39QI6jG2dSbj7iEll4C52QsaPIn9MXBYAz0fOtsh92f%2B%2FN4pxWnFd752fQE%2BmUt2vlFC2hmUIn76ahpc8MLO0aTmRkEzOHC7tiacFcVsySrT44PGWdYxLLqJp874WU%2BLRSbFnRAOFkXlUu4j2xxkpobJZZZjtqsLDO8Kkp%2BOiTP8pTk0OeApMRIIhWH3jsMLRmU79j6K9yEjRuxB5FG72BKNpZfn%2FZFHkKYd3MFBp2yLTGIgZB%2FCCHWILzssFtkpUhQnYETUBfN7zGd4acKa8GO2kqd%2FVSw7hYXStiUsovGLZ7VJX1WPKIjZPNai1g%3D%3D'
        },
        {
          id: 6,
          show: false,
          parnercode: 6,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565007199967.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=JBbD8KEx5vm5KLyueTWDhj6HISHf4V0fqh5Hv13JzK91Tx3O9OxocmIVqhVphKx02TuJSWJ2pHJGGoM5itjLndELXIE%2FYhC3V6mzfYJFJ%2FKHk4GlRxFYntQ5K6C2O7%2Bo%2B83tjO%2BVPc1cXzxLQVDHF2XyDt91Ljz3Ah8dWhIruQpinySGYMEYg%2BTeRAOx8UgAdVKrsS4ZRIQ6HLwjb1g1jNpm3BTFTQm6W8eqkuspMk6Id1kei2aysxxKcn1uQTYTFkAyMbCnT0e9mDRufsrKjtFzGiWdsqsh9w1RKQJe4jwp%2BGEfLkI28MVR1quP4n5M895%2Fv%2Fj04JIX13TwYM7GBg%3D%3D'
        },
        {
          id: 7,
          show: false,
          parnercode: 7,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565007143669.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=e6M%2BPjHVdNc8SmUOEFkVTOeD0X4yTiYQGKmRZCP3cfT7LUGXSY0GjGAnX%2Fp3RHXTstP9YaJUsrIlCQc3hi%2FoFLaGHqxCs0veIV8CQMHiMRtjxxteliajWQ6B0t8tVhSMeeN%2BG9Aji56kXjofDM77RPHKrJLG6sEiMRw6K2Prym%2BgCOYNrI4uooYo6Utcmw4C8TFBufqDaJ1Gkw0Rib9bRcb94OqutW0e26rt%2F7z3hXOdkZgxVvXxizxJQR5eV%2B4%2Bg28tm0XNwAKDGejB5X5pJua0LmYaq%2Bq1YfpU6RY%2BN%2BqKwVR3tE0xDj9j6cJ3ZWEDqL5HQyxESguBk%2B2jY2u9Sg%3D%3D'
        },
        {
          id: 8,
          show: false,
          parnercode: 8,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565007336193.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ntHOFSHWrpasQRZiUu6KQAC%2FBQ8tv1qKylz2hqXZ1Jk9dV8ej2ib5gDk21Yf8WeHiaNauVStz7aCn2pXExEoixxNtov8OJ3pI9m%2F%2FlDnCE2iNqNxNP6otESK%2BNV9%2FcyWsq78gQ5AF8TCW0tX6RSta8A1vuMQo6Ued9Sw04IzBDJBNbrYD1SDJ%2BBO7jeiHDxh4dU6OTE3t2L6EJ0OOgvTUn%2B7e9yovbEeeiYefi8y4WdX40nr57WjQaSar7n4sJn9CDv2rYosCNF3LcIThGdEvy4BwHbET52tCamOm0gQKJqPb%2Bjs6X%2F02yhcxLwW63zHo%2Bzd0Hv4eDfx%2FeBqFIS%2FIw%3D%3D'
        },
        {
          id: 9,
          show: false,
          parnercode: 9,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565007036026.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=FeHJrlHtiVwQO%2BhZuDgJdppy%2FiIz4IN8CNiNTDhouAxTyu6qj%2Bi4bxVZZhOiiH%2Bot1Jt77NCoaJYgBJI1rPSi7OcdexPDjDsOXPq%2BxEn2%2Bee9%2FybYONrmjTqU6m2gwUnpfUm%2FTRje0ny0CaGyRuuIxyDJXdPI3lVHJRQ2k004blxP%2FWzuXY5Y%2BqvG3kmMQBbTrn5HANUMPU9KnEBVdP2KYL%2FlP8%2FieH21kekiStLrshCF7OlyttYlnDpZdmUieiQYh%2FoYm3Dw8wfbgaEGgAR7bn8Y9S3jvIm5lraK%2F3B1SQYLpZ7h42HKfBp1qjRucfJSfeaOQtqqeAIaQtbkz%2B6kw%3D%3D'
        },
        {
          id: 10,
          show: false,
          parnercode: 10,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565007120210.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=QSxNLtakg1Awh4bFEgjqNW77rI4Kf2%2FV%2BTrv6LE8qjSMSsqxBVjjsdpcIWTh4z1ec%2B4iDA8F6pJK5SGScJHIM9PfxhXrOCzSirVaRlBh%2BYPSH4D%2Bpvb9x73KzQvzdY%2B81SqiHjct7sBVEOKmGAKHcVxwvFOWjtfztrH2LZS5qvTds2ZA4GKdFia4M5XmWXD%2F9fKrcOxsuTyCFrDCeMxZYdQuImuP2PzAEFA0PvZVVQ5aGRTFDwkj5qaVHNOnq2jIPYVHW36uIY7BjpQDDCdvJjYuHuPdvLL%2FrhbNZ%2FVzSapMejJLjsOyvB3SzjwtashC7gW40m1npRlY%2B6%2B21QLTxw%3D%3D'
        },
        {
          id: 11,
          show: false,
          parnercode: 11,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1564303398910.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=SRXjQ7w5y%2BnsjJivyYMVu775AEjkHilSRUX%2FbLFqBOjCqjMxQWfmwnf7NIapfcTVc%2FN9qQXcvMw6c79ASBYLJWBDiSSnPu7vSVY4P1z2bHvsMuI3vtx3f49ZuFoe9DRHn6adBRGBI9XgEnwuY90zEPG6Kcce1L2lPWS1ZIsjFOLHLekxg9QkoP4uFizvKMgi%2B%2BGEZf9Z6k15wtixg1O91cFnMUgdSFBIKTlytsVWTAGHpA5MoKnvpWtCp76k2U%2F3qSa0UFhzfCIvRRt%2B%2Fy839aoG9pv3ASJo13HCtN9S2UWnqGbW3aagOtZc6XP7V0C6Gqo0KskLzh%2BvVvlY0ph%2Biw%3D%3D'
        },
        {
          id: 12,
          show: false,
          parnercode: 12,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565007311312.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=HJ0xY9aBiJt3nvR2Gow7GMk20m%2FWo%2BMUYtJHWvXG%2FMillhB4MQE65xs7okFq7f5wzSvYkccUzrPakFpk6REylPeZOANvnQN%2FQ0YdYNUbOna018RVflfe9QnNj00lh7d04%2BD5lBxojdA15TBDZlYCgyT4UL4Tfe0z9B1tPYTlFN7BOvlmZhIBVLtBWFrCIcCY9JIAzxUg9HpqSOd8DL5M4AmG5VHq5gSt1xfE7YXj2WjduoAA7vz8seHyulcQYD4ES%2FaLwSjE4T2Vno2mliUJp1i%2FNSLuAQjlbt2vLfIyMygsAbJQf55DZqaphRq%2B6Pps%2B34JsOY3%2Fw7MdoT1wUcUjg%3D%3D'
        },
        {
          id: 13,
          show: false,
          parnercode: 1,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565007016179.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=pMPkOqIisoRw%2B531bywiEyW76wV0VyqS2F5iWkOLaXrQkyioQkgCUTxSuZm%2F5qv0iPVaKajv8pMhFiNPZoNxxXvUOCBbhEPr5T3CLPDw4pIkDrryeO5uSyQoCApaQnN%2FObibitkXQ2E4AjjMtOPRtPBLd6f0bQC8jPkMf4HTRBLE0bMu6jGl9O%2FNXCLu5oWa91Jacr3KlZTibsKIUZGIKk2fbD5wR%2BeKgJGI2q5D%2FaO1PyITFlKhwL4B3dlfkcwFiHo0H3jgE5ROxirOQ%2F2K3efoZunHmLCn8%2Facbk4zWaw7WJ7YX0F5STfzKTZ6ixG%2B7eVSItC1W5Gz6TVPiMqP5Q%3D%3D'
        },
        {
          id: 14,
          show: false,
          parnercode: 2,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1564303866157.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=nFVHybVa%2FN%2FXEqiboCp%2B7BdcLXhUzg8ilsEF6%2F0Dvr1j2r%2B%2Bu6hhFFsUFQYwzBciUNgv%2BFniTLqfOYlPYJ79SV%2BGcGYdvvVnB4vOGCbKhEjpUmaeT9jJ%2FNUeSPVzi%2F2Ktk2CqROCveIBCxRje2jvpvUn%2BmKNqYM3tGFqja1k32Jc0pZjoyMeGyFOxCyJTPvzTtLhb2esKHEDF1uzuyjD5a1cX%2FPHMUXa%2BiXYi%2FgjTBPH9tvI7GUjxgsBpWuHAGMaCvm%2Fne2nqtIcKlEgVA3D%2FJmpHXMUfKTAM4z0Yqd1hW1nImKwR3pqVMwOtXk8sL6URGDZgbwAqtdp8kKMVIsrNw%3D%3D'
        },
        {
          id: 15,
          show: false,
          parnercode: 3,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565006894549.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=d%2BHHdQEtdxiZkdoGIRH8RIHq8g0dnLJcOPW8cC9D%2FVk0oQzlNIBjUKlzQ4TvqElFt8bJeGXdw0O98lkZOh6ZSXkPQjzQlMHv5tyhHZpe04Lk9R6zKU5GC%2FX4VcizQu%2BOtC9eabrsFrzZhYABb9vpJMn111pb22Nsoy%2FV4U1kVec3wTz6YEhXMPBtNjoCnyrxXwCPdqrukydsYuhpIEsFAxJ%2Bg4YZcyoSk1RUdvIz1MW7sPvmNMbvyOUWFbpHH2CewDsBntT0tYt2mKYa%2FZTkz62UIuM7QckmhookIl15J%2BFEDxxSx3hfAKxjZDYXIj5sv%2FQJPEmxrzAkw8wJRTeuxw%3D%3D'
        },
        {
          id: 16,
          show: false,
          parnercode: 4,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565007277580.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=VK68KPLAZnuI32fr9XaG9T3RvbCYk12ShmkcjVW81MnA0Fj5XxjuFzfpyYf9O0tRy%2Byp82vE%2BcV3OP5fqMw3VCxw9LqmNLsOQdIx5jBpIdIx%2F1Sxblx%2FDhbpOtwfNs6Ys%2BA3aVptw7gFE4au%2FYL2C1%2BHQgyN2rYWu%2BjTi27hKEdQyJOIH8UQ0Fz93q6ad8EUjRaoseNDO02dYm9%2FwNfxlzCc7toeaFe0r9a%2F%2BHG5wqPCNexrJJN1hk%2BAMtdlGgINB7TRT6tZBgF%2BNZ2ok%2Bl%2BiGUDDOa756zr%2F4%2B%2FQnDAIYCBozi2nYAvXRBHecJpgvaG4Yc3TtAsWjP7xo6BjwDlvg%3D%3D'
        },
        {
          id: 17,
          show: false,
          parnercode: 5,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565006876881.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Unz%2FIZn9cU%2BV7L8Yv6PNmOPU39QI6jG2dSbj7iEll4C52QsaPIn9MXBYAz0fOtsh92f%2B%2FN4pxWnFd752fQE%2BmUt2vlFC2hmUIn76ahpc8MLO0aTmRkEzOHC7tiacFcVsySrT44PGWdYxLLqJp874WU%2BLRSbFnRAOFkXlUu4j2xxkpobJZZZjtqsLDO8Kkp%2BOiTP8pTk0OeApMRIIhWH3jsMLRmU79j6K9yEjRuxB5FG72BKNpZfn%2FZFHkKYd3MFBp2yLTGIgZB%2FCCHWILzssFtkpUhQnYETUBfN7zGd4acKa8GO2kqd%2FVSw7hYXStiUsovGLZ7VJX1WPKIjZPNai1g%3D%3D'
        },
        {
          id: 18,
          show: false,
          parnercode: 6,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565007199967.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=JBbD8KEx5vm5KLyueTWDhj6HISHf4V0fqh5Hv13JzK91Tx3O9OxocmIVqhVphKx02TuJSWJ2pHJGGoM5itjLndELXIE%2FYhC3V6mzfYJFJ%2FKHk4GlRxFYntQ5K6C2O7%2Bo%2B83tjO%2BVPc1cXzxLQVDHF2XyDt91Ljz3Ah8dWhIruQpinySGYMEYg%2BTeRAOx8UgAdVKrsS4ZRIQ6HLwjb1g1jNpm3BTFTQm6W8eqkuspMk6Id1kei2aysxxKcn1uQTYTFkAyMbCnT0e9mDRufsrKjtFzGiWdsqsh9w1RKQJe4jwp%2BGEfLkI28MVR1quP4n5M895%2Fv%2Fj04JIX13TwYM7GBg%3D%3D'
        },
        {
          id: 19,
          show: false,
          parnercode: 7,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565007143669.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=e6M%2BPjHVdNc8SmUOEFkVTOeD0X4yTiYQGKmRZCP3cfT7LUGXSY0GjGAnX%2Fp3RHXTstP9YaJUsrIlCQc3hi%2FoFLaGHqxCs0veIV8CQMHiMRtjxxteliajWQ6B0t8tVhSMeeN%2BG9Aji56kXjofDM77RPHKrJLG6sEiMRw6K2Prym%2BgCOYNrI4uooYo6Utcmw4C8TFBufqDaJ1Gkw0Rib9bRcb94OqutW0e26rt%2F7z3hXOdkZgxVvXxizxJQR5eV%2B4%2Bg28tm0XNwAKDGejB5X5pJua0LmYaq%2Bq1YfpU6RY%2BN%2BqKwVR3tE0xDj9j6cJ3ZWEDqL5HQyxESguBk%2B2jY2u9Sg%3D%3D'
        },
        {
          id: 20,
          show: false,
          parnercode: 8,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565007336193.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ntHOFSHWrpasQRZiUu6KQAC%2FBQ8tv1qKylz2hqXZ1Jk9dV8ej2ib5gDk21Yf8WeHiaNauVStz7aCn2pXExEoixxNtov8OJ3pI9m%2F%2FlDnCE2iNqNxNP6otESK%2BNV9%2FcyWsq78gQ5AF8TCW0tX6RSta8A1vuMQo6Ued9Sw04IzBDJBNbrYD1SDJ%2BBO7jeiHDxh4dU6OTE3t2L6EJ0OOgvTUn%2B7e9yovbEeeiYefi8y4WdX40nr57WjQaSar7n4sJn9CDv2rYosCNF3LcIThGdEvy4BwHbET52tCamOm0gQKJqPb%2Bjs6X%2F02yhcxLwW63zHo%2Bzd0Hv4eDfx%2FeBqFIS%2FIw%3D%3D'
        },
        {
          id: 21,
          show: false,
          parnercode: 9,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565007036026.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=FeHJrlHtiVwQO%2BhZuDgJdppy%2FiIz4IN8CNiNTDhouAxTyu6qj%2Bi4bxVZZhOiiH%2Bot1Jt77NCoaJYgBJI1rPSi7OcdexPDjDsOXPq%2BxEn2%2Bee9%2FybYONrmjTqU6m2gwUnpfUm%2FTRje0ny0CaGyRuuIxyDJXdPI3lVHJRQ2k004blxP%2FWzuXY5Y%2BqvG3kmMQBbTrn5HANUMPU9KnEBVdP2KYL%2FlP8%2FieH21kekiStLrshCF7OlyttYlnDpZdmUieiQYh%2FoYm3Dw8wfbgaEGgAR7bn8Y9S3jvIm5lraK%2F3B1SQYLpZ7h42HKfBp1qjRucfJSfeaOQtqqeAIaQtbkz%2B6kw%3D%3D'
        },
        {
          id: 22,
          show: false,
          parnercode: 10,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565007120210.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=QSxNLtakg1Awh4bFEgjqNW77rI4Kf2%2FV%2BTrv6LE8qjSMSsqxBVjjsdpcIWTh4z1ec%2B4iDA8F6pJK5SGScJHIM9PfxhXrOCzSirVaRlBh%2BYPSH4D%2Bpvb9x73KzQvzdY%2B81SqiHjct7sBVEOKmGAKHcVxwvFOWjtfztrH2LZS5qvTds2ZA4GKdFia4M5XmWXD%2F9fKrcOxsuTyCFrDCeMxZYdQuImuP2PzAEFA0PvZVVQ5aGRTFDwkj5qaVHNOnq2jIPYVHW36uIY7BjpQDDCdvJjYuHuPdvLL%2FrhbNZ%2FVzSapMejJLjsOyvB3SzjwtashC7gW40m1npRlY%2B6%2B21QLTxw%3D%3D'
        },
        {
          id: 23,
          show: false,
          parnercode: 11,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1564303398910.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=SRXjQ7w5y%2BnsjJivyYMVu775AEjkHilSRUX%2FbLFqBOjCqjMxQWfmwnf7NIapfcTVc%2FN9qQXcvMw6c79ASBYLJWBDiSSnPu7vSVY4P1z2bHvsMuI3vtx3f49ZuFoe9DRHn6adBRGBI9XgEnwuY90zEPG6Kcce1L2lPWS1ZIsjFOLHLekxg9QkoP4uFizvKMgi%2B%2BGEZf9Z6k15wtixg1O91cFnMUgdSFBIKTlytsVWTAGHpA5MoKnvpWtCp76k2U%2F3qSa0UFhzfCIvRRt%2B%2Fy839aoG9pv3ASJo13HCtN9S2UWnqGbW3aagOtZc6XP7V0C6Gqo0KskLzh%2BvVvlY0ph%2Biw%3D%3D'
        },
        {
          id: 24,
          show: false,
          parnercode: 12,
          imageUrl: 'https://storage.googleapis.com/vue-course-api.appspot.com/spenguin10%2F1565007311312.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=HJ0xY9aBiJt3nvR2Gow7GMk20m%2FWo%2BMUYtJHWvXG%2FMillhB4MQE65xs7okFq7f5wzSvYkccUzrPakFpk6REylPeZOANvnQN%2FQ0YdYNUbOna018RVflfe9QnNj00lh7d04%2BD5lBxojdA15TBDZlYCgyT4UL4Tfe0z9B1tPYTlFN7BOvlmZhIBVLtBWFrCIcCY9JIAzxUg9HpqSOd8DL5M4AmG5VHq5gSt1xfE7YXj2WjduoAA7vz8seHyulcQYD4ES%2FaLwSjE4T2Vno2mliUJp1i%2FNSLuAQjlbt2vLfIyMygsAbJQf55DZqaphRq%2B6Pps%2B34JsOY3%2Fw7MdoT1wUcUjg%3D%3D'
        }
      ],
      ans: [],
      anslist: [],
      timer: '',
      maxtime: '',
      minute: '',
      second: '',
      reward1: {
        name: '95折優惠券',
        code: 'SKSH8246'
      },
      reward2: {
        name: '90折優惠券',
        code: 'LSGJ2681'
      },
      reward3: {
        name: '85折優惠券',
        code: 'GFDH3245'
      },
      reward_1: false,
      reward_2: false,
      reward_3: false,
      ongame: false,
      gameover: false
    }
  },
  methods: {
    rearray () {
      const vm = this
      vm.imagelist.sort(function (a, b) {
        return Math.random() > 0.5 ? -1 : 1
      })
    },
    flip (item) {
      const vm = this
      if (!item.show) {
        item.show = true
        if (vm.ans.length !== 0) {
          if (vm.ans[0].parnercode === item.parnercode) {
            vm.anslist.push(vm.ans[0])
            let clearans = vm.ans.splice(1)
            vm.ans = clearans
            vm.anslist.push(item)
          } else {
            let preflip = vm.ans[0]
            let clearans = vm.ans.splice(1)
            vm.ans = clearans
            setTimeout(function () {
              item.show = false
              preflip.show = false
            }, 1000)
          }
        } else {
          vm.ans.push(item)
        }
      }
    },
    noflip () {
      $('#plzClickStart').css({ 'z-index': '1051' })
      $('#plzClickStart').modal('show')
    },
    CountDown () {
      const vm = this
      if (vm.ongame) {
        if (vm.anslist.length !== 24) {
          if (vm.maxtime >= 0) {
            vm.formatMinutes(vm.maxtime)
            if (vm.maxtime !== 0) {
              --vm.maxtime
            } else {
              if ($('#gameModal').hasClass('show')) {
                vm.gameOver()
              }
            }
          }
        } else {
          vm.gameOver()
        }
      }
    },
    formatMinutes (minutes) {
      const vm = this
      let minute = Math.floor(minutes / 60)
      let second = minute > 0 ? Math.floor(minutes - minute * 60) : minutes
      vm.minute = minute
      vm.second = second
    },
    startGame () {
      if (!this.ongame) {
        this.dataReSet()
        this.maxtime = 60
        this.ongame = true
        this.timer = setInterval(this.CountDown, 1000)
      }
    },
    gameOver () {
      clearInterval(this.timer)
      this.ongame = false
      if (this.anslist.length < 20 && this.anslist.length >= 12) {
        this.reward_1 = true
        this.$store.commit('cartsModules/GETCOUPON', this.reward1)
      } else if (this.anslist.length < 24 && this.anslist.length >= 20) {
        this.reward_2 = true
        this.$store.commit('cartsModules/GETCOUPON', this.reward2)
      } else if (this.anslist.length === 24) {
        this.reward_3 = true
        this.$store.commit('cartsModules/GETCOUPON', this.reward3)
      } else {
        this.gameover = true
      }
      $('#gameModal').modal('hide')
      setTimeout(function () {
        $('#gameOver').modal('show')
      }, 500)
    },
    closeGame () {
      clearInterval(this.timer)
      this.dataReSet()
    },
    dataReSet () {
      const vm = this
      clearInterval(this.timer)
      vm.ans = []
      vm.anslist = []
      vm.timer = ''
      vm.maxtime = ''
      vm.minute = ''
      vm.second = ''
      vm.reward_1 = false
      vm.reward_2 = false
      vm.reward_3 = false
      vm.ongame = false
      vm.gameover = false
      vm.imagelist.forEach(item => { item.show = false })
    }
  },
  created () {
    const vm = this
    vm.$bus.$on('cardReset', function () {
      vm.dataReSet()
      vm.rearray()
    })
  }
}
</script>
