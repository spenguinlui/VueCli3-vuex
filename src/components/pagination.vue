<template>
    <div>
        <nav v-if="pages != 0" aria-label="Page navigation example">
            <ul class="pagination pagination-lg justify-content-center mt-4">
                <li class="page-item" :class="{'disabled': !pages.has_pre}">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="updatePage(pages.current_page -1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li class="page-item" v-for="page in pages.total_pages" :key="page" :class="{'active': pages.current_page === page}"><a class="page-link" href="#" @click.prevent="updatePage(page)">{{ page }}</a></li>
                <li class="page-item" :class="{'disabled': !pages.has_next}">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="updatePage(pages.current_page +1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    updatePage (page) {
      this.$emit('emitpage', page)
    }
  }
}
</script>
