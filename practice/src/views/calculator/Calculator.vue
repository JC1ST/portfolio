<template>
  <Header />
  <div class="calculator">
    <div class="top-banner"></div>
    <div class="title">수익성 계산기</div>
    <div class="calc-box">
      <div class="left-calc-box">
        <div class="input-box">
          <div class="text">월 예상 매출</div>
          <div class="input-zone">
            <input
              v-model="monthSales"
              type="text"
              id="monthSales"
              aria-describedby="basic-addon2"
              placeholder="금액을 입력해 주세요"
              maxlength="11"
              @input="checkNumber"
            />
            <span
              class="input-group-text"
              id="basic-addon2"
              @click="monthSales = ''"
              >취소</span
            >
            <div class="absolute-text">원</div>
          </div>
        </div>
        <div class="input-box">
          <div class="text">원가비율<span id="noti">(%)</span></div>
          <div class="input-zone">
            <input
              v-model="percent"
              type="text"
              id="percent"
              aria-describedby="basic-addon2"
              placeholder="숫자를 입력해 주세요"
              maxlength="3"
              @input="checkNumber"
            />
            <span
              class="input-group-text"
              id="basic-addon2"
              @click="percent = ''"
              >취소</span
            >
            <div class="absolute-text">%</div>
          </div>
        </div>
        <div class="input-box">
          <div class="text">임대료</div>
          <div class="input-zone">
            <input
              v-model="rent"
              id="rent"
              type="text"
              aria-describedby="basic-addon2"
              placeholder="금액을 입력해 주세요"
              maxlength="11"
              @input="checkNumber"
            />
            <span class="input-group-text" id="basic-addon2" @click="rent = ''"
              >취소</span
            >
            <div class="absolute-text">원</div>
          </div>
        </div>
        <div class="input-box">
          <div class="text">관리비</div>
          <div class="input-zone">
            <input
              v-model="adminEx"
              id="adminEx"
              type="text"
              aria-describedby="basic-addon2"
              placeholder="금액을 입력해 주세요"
              maxlength="11"
              @input="checkNumber"
            />
            <span
              class="input-group-text"
              id="basic-addon2"
              @click="adminEx = ''"
              >취소</span
            >
            <div class="absolute-text">원</div>
          </div>
        </div>
        <div class="input-box">
          <div class="text">인건비</div>
          <div class="input-zone">
            <input
              v-model="salary"
              id="salary"
              type="text"
              aria-describedby="basic-addon2"
              placeholder="금액을 입력해 주세요"
              maxlength="11"
              @input="checkNumber"
            />
            <span
              class="input-group-text"
              id="basic-addon2"
              @click="salary = ''"
              >취소</span
            >
            <div class="absolute-text">원</div>
          </div>
        </div>
        <div class="input-box">
          <div class="text">
            기타비용<span id="noti">(로열티, 광고비 등)</span>
          </div>
          <div class="input-zone">
            <input
              v-model="etc"
              id="etc"
              type="text"
              aria-describedby="basic-addon2"
              placeholder="금액을 입력해 주세요"
              maxlength="11"
              @input="checkNumber"
            />
            <span class="input-group-text" id="basic-addon2" @click="etc = ''"
              >취소</span
            >
            <div class="absolute-text">원</div>
          </div>
        </div>
      </div>
      <div class="right-result-box">
        <div>월 예상 매출이 {{ monthComputed }} 원 일시</div>
        <div>
          예상되는 수익율은 <span class="point">{{ per }}%</span>
        </div>
        <div>
          수익은 <span class="point">{{ result }} 원</span> 입니다
        </div>
      </div>
    </div>
  </div>
  <Footer />
  <RightSideBar />
</template>

<script lang="ts" setup>
import Header from '@/components/commons/Header.vue'
import Footer from '@/components/commons/Footer.vue'
import RightSideBar from '@/components/commons/RightSideBar.vue'
import { computed, ref } from 'vue'

const monthSales = ref<string>('')
const percent = ref<string>('')
const rent = ref<string>('')
const adminEx = ref<string>('')
const salary = ref<string>('')
const etc = ref<string>('')

const per = ref<string>('0')
const result = ref<string>('0')

const monthComputed = computed(() => {
  const month = monthSales.value

  if (month.length === 0) {
    return '0'
  } else {
    return parseInt(month.replaceAll(',', '')).toLocaleString()
  }
})

const calcResult = () => {
  const rMonth =
    monthSales.value.length === 0
      ? 0
      : parseInt(monthSales.value.replaceAll(',', ''))
  const rPercent =
    percent.value.length === 0
      ? 0
      : rMonth * (parseInt(percent.value.replaceAll(',', '')) / 100)
  const rRent =
    rent.value.length === 0 ? 0 : parseInt(rent.value.replaceAll(',', ''))
  const rAdminEx =
    adminEx.value.length === 0 ? 0 : parseInt(adminEx.value.replaceAll(',', ''))
  const rSalary =
    salary.value.length === 0 ? 0 : parseInt(salary.value.replaceAll(',', ''))
  const rEtc =
    etc.value.length === 0 ? 0 : parseInt(etc.value.replaceAll(',', ''))

  const sales = rMonth - (rPercent + rRent + rAdminEx + rSalary + rEtc)
  const perCent = rMonth === 0 ? 0 : ((sales / rMonth) * 100).toFixed(1)

  result.value = sales.toLocaleString()
  per.value = perCent.toLocaleString()
}

const checkNumber = (e: Event) => {
  const regex = /[^0-9]/gi
  const input = e.target as HTMLInputElement
  input.value = input.value.replaceAll(regex, '')

  if (input.id === 'monthSales') {
    monthSales.value = isNaN(parseInt(input.value))
      ? ''
      : parseInt(input.value).toLocaleString()
  } else if (input.id === 'percent') {
    percent.value = isNaN(parseInt(input.value))
      ? ''
      : parseInt(input.value).toLocaleString()
  } else if (input.id === 'rent') {
    rent.value = isNaN(parseInt(input.value))
      ? ''
      : parseInt(input.value).toLocaleString()
  } else if (input.id === 'adminEx') {
    adminEx.value = isNaN(parseInt(input.value))
      ? ''
      : parseInt(input.value).toLocaleString()
  } else if (input.id === 'salary') {
    salary.value = isNaN(parseInt(input.value))
      ? ''
      : parseInt(input.value).toLocaleString()
  } else if (input.id === 'etc') {
    etc.value = isNaN(parseInt(input.value))
      ? ''
      : parseInt(input.value).toLocaleString()
  }

  calcResult()
}
</script>

<style lang="scss" scoped>
@import '@/scss/main';

.calculator {
  .top-banner {
    width: 100%;
    height: 300px;
    margin-bottom: 60px;
    color: #353535;
  }

  .title {
    font-size: 26px;
    @include make-container();
    margin-bottom: 60px;
  }

  .calc-box {
    @include make-container();
    display: flex;
    justify-content: space-between;
    .left-calc-box {
      width: 840px;
      border-radius: 10px;
      box-shadow: 0 0 6px 0 rgba(0, 16, 40, 0.2);
      background-color: #fff;
      padding: 20px 40px;
      margin-bottom: 100px;

      .input-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;

        .text {
          font-size: 20px;

          #noti {
            font-size: 12px;
            color: #777;
          }
        }

        .input-zone {
          display: flex;
          position: relative;

          input[type='text'] {
            border-radius: 5px 0 0 5px;
            border: solid 1px #dcdcdc;
            background-color: #fff;
            border-right: none;
            width: 350px;
            height: 30px;
            padding-right: 60px;
            font-size: 14px;
            text-align: right;
            color: #353535;

            &::placeholder {
              color: #dcdcdc;
            }
          }

          .input-group-text {
            border-left: none;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            cursor: pointer;
            width: 76px;
            height: 30px;
            font-size: 14px;
            color: #777;
            justify-content: center;
          }

          .absolute-text {
            position: absolute;
            font-size: 14px;
            color: #353535;
            right: 106px;
            top: 8px;
          }
        }
      }
    }

    .right-result-box {
      width: 418px;
      height: 225px;
      margin-top: -8px;
      padding: 20px 40px;
      background-repeat: no-repeat;

      div {
        padding: 20px 0;
        font-size: 20px;
        color: #fff;
        font-weight: 500;

        .point {
          font-weight: bold;
          color: $primary;
        }
      }
    }
  }
}
</style>
