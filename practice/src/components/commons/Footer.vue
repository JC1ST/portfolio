<template>
  <footer>
    <div class="footer-zone">
      <div class="info-zone">
        <div class="footer-menu-zone">
          <a target="_blank" class="footer-menu">개인정보 수집 및 이용동의</a>
          <a target="_blank" class="footer-menu">서비스 이용약관</a>
          <a target="_blank" class="footer-menu">마케팅 정보 수신동의</a>
        </div>
        <div class="company-info">
          <div class="company-owner-name">대표이사 : ___</div>
          <div class="biz-number">사업자등록번호 : 000-11-23456</div>
          <div class="company-address">
            서울특별시 강남구 테헤란로, 경기도 수원시 영통구 영통로
          </div>
          <div class="company-email">이메일 : ________@_____.com</div>
          <div class="company-biz-type">
            통신판매업 제2022 - 서울강남 - _____호
          </div>
          <div class="copyright">
            Copyright © ________.co.kr. All rights reserved.
          </div>
        </div>
      </div>

      <div class="cs-center">
        <div class="cs-info-zone">
          <div>고객센터</div>
          <div>031-123-4567</div>
          <div class="working-time">
            평일 : 10시 ~ 20시 점심시간 : 12시 ~ 14시 토요일,일요일,공휴일 :
            휴무
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import '@/scss/main';

footer {
  width: 100%;
  height: 300px;
  border-top: 1px solid #dcdcdc;
  padding-top: 50px;
  background-color: #fcfcfc;

  .footer-zone {
    @include make-container();
    display: flex;
    justify-content: space-between;

    .info-zone {
      .footer-menu-zone {
        display: flex;
        margin-bottom: 40px;

        .footer-menu {
          font-size: 12px;
          color: #888;
          cursor: pointer;
          text-decoration: none;

          &:hover {
            color: #353535;
          }

          &:not(:first-child):before {
            content: '';
            border-left: 1px solid #888;
            margin: 0 20px;
          }
        }
      }

      .company-info {
        font-size: 12px;
        color: #888;
        line-height: 1.33;

        .company-address {
          margin-bottom: 20px;
        }

        .company-biz-type {
          margin-bottom: 40px;
        }
      }
    }

    .cs-center {
      display: flex;
      justify-content: center;
      align-items: center;

      .cs-info-zone {
        padding: 30px 40px;
        background-color: #f2f4f6;

        div {
          font-size: 24px;
          color: #222;
          font-weight: bold;

          &:nth-child(2) {
            margin-top: 20px;
            margin-bottom: 15px;
          }

          &.working-time {
            font-size: 12px;
            color: #888;
            font-weight: normal;
          }
        }
      }
    }
  }
}
</style>
