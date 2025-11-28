import React from "react";

export default function Footer() {
  return (
    <footer className="shadow-lg font-futura relative z-2 w-screen bg-background border-t-4 border-white flex flex-col">
      <div className="flex flex-col lg:flex-row w-full justify-between items-center lg:items-start p-8 gap-8 w-[80%]">
        <div className="flex flex-col justify-center items-center lg:items-start gap-4">
          <h2 className="text-2xl font-impact">ENTHUSIAST</h2>
          <div className="flex gap-4 items-center">
            <a href="https://wa.me/+6287722727717" target="_blank">
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.0023 4.6665C40.8893 4.6665 51.3357 15.1128 51.3357 27.9998C51.3357 40.8868 40.8893 51.3332 28.0023 51.3332C23.8788 51.3403 19.8277 50.249 16.2657 48.1715L4.67835 51.3332L7.83301 39.7412C5.75391 36.178 4.66179 32.1252 4.66901 27.9998C4.66901 15.1128 15.1153 4.6665 28.0023 4.6665ZM20.0503 17.0332L19.5837 17.0518C19.282 17.0726 18.9872 17.1519 18.7157 17.2852C18.4627 17.4287 18.2317 17.6079 18.0297 17.8172C17.7497 18.0808 17.591 18.3095 17.4207 18.5312C16.5576 19.6533 16.0929 21.0309 16.1 22.4465C16.1047 23.5898 16.4033 24.7028 16.87 25.7435C17.8243 27.8482 19.3947 30.0765 21.4667 32.1415C21.966 32.6385 22.456 33.1378 22.9833 33.6022C25.558 35.8688 28.626 37.5034 31.9433 38.3762L33.2687 38.5792C33.7003 38.6025 34.132 38.5698 34.566 38.5488C35.2454 38.513 35.9088 38.329 36.5097 38.0098C36.815 37.852 37.1132 37.6807 37.4033 37.4965C37.4033 37.4965 37.5021 37.4296 37.695 37.2865C38.01 37.0532 38.2037 36.8875 38.465 36.6145C38.661 36.4123 38.8243 36.1774 38.955 35.9098C39.137 35.5295 39.319 34.8038 39.3937 34.1995C39.4497 33.7375 39.4333 33.4855 39.4263 33.3292C39.417 33.0795 39.2093 32.8205 38.983 32.7108L37.625 32.1018C37.625 32.1018 35.595 31.2175 34.3537 30.6528C34.2237 30.5963 34.0846 30.5639 33.943 30.5572C33.7833 30.5405 33.622 30.5583 33.4698 30.6094C33.3176 30.6605 33.1782 30.7438 33.061 30.8535C33.0493 30.8488 32.893 30.9818 31.206 33.0258C31.1092 33.1559 30.9758 33.2543 30.8229 33.3083C30.67 33.3623 30.5044 33.3696 30.3473 33.3292C30.1953 33.2886 30.0463 33.2372 29.9017 33.1752C29.6123 33.0538 29.512 33.0072 29.3137 32.9232C27.9741 32.3396 26.734 31.55 25.6387 30.5828C25.3447 30.3262 25.0717 30.0462 24.7917 29.7755C23.8738 28.8963 23.0738 27.9018 22.4117 26.8168L22.274 26.5952C22.1766 26.4454 22.0968 26.2849 22.036 26.1168C21.9473 25.7738 22.1783 25.4985 22.1783 25.4985C22.1783 25.4985 22.7453 24.8778 23.009 24.5418C23.2657 24.2152 23.4827 23.8978 23.6227 23.6715C23.898 23.2282 23.9843 22.7732 23.8397 22.4208C23.1863 20.8248 22.5112 19.2374 21.8143 17.6585C21.6767 17.3458 21.2683 17.1218 20.8973 17.0775C20.7713 17.0619 20.6453 17.0495 20.5193 17.0402C20.206 17.0222 19.8919 17.0253 19.579 17.0495L20.0503 17.0332Z"
                  fill="white"
                />
              </svg>
            </a>

            <a href="mailto:limpingensoftcomp@gmail.com" target="_blank">
              <svg
                width="48"
                height="38"
                viewBox="0 0 48 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M42.6667 0.333496H5.33334C2.76667 0.333496 0.690005 2.4335 0.690005 5.00016L0.666672 33.0002C0.666672 35.5668 2.76667 37.6668 5.33334 37.6668H42.6667C45.2333 37.6668 47.3333 35.5668 47.3333 33.0002V5.00016C47.3333 2.4335 45.2333 0.333496 42.6667 0.333496ZM42.6667 9.66683L24 21.3335L5.33334 9.66683V5.00016L24 16.6668L42.6667 5.00016V9.66683Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          <div className="flex text-lg flex-col gap-4 items-center lg:items-start">
            <h2 className="text-2xl font-impact">Registrations</h2>
            <a
              href="/pricing"
              className="font-normal text-white mb-0 text-center lg:text-start"
            >
              5k run
            </a>
            <a
              href="/pricing"
              className="font-normal text-white mb-0 text-center lg:text-start"
            >
              10k run
            </a>
          </div>
          <div className="flex text-lg flex-col gap-4 items-center lg:items-start max-w-[400px]">
            <h2 className="text-2xl font-impact">Contact us</h2>
            <p className="font-normal mb-0 text-center text-lg-start">
              +62 877 227 277 17
            </p>
            <a
              href="mailto:enthusiast@gmail.com"
              className="font-normal mb-0 text-center text-white lg:text-start"
            >
              enthusiast@gmail.com
            </a>
            <p className="font-normal mb-0 text-center lg:text-start">
              Jl. Raja H. Fisabililah 28, Sei Jang, Bukit Bestari, Kota Tanjung
              Pinang Kepulauan Riau 29123
            </p>
          </div>
        </div>
      </div>
      <div className="bg-black/10 w-full">
        <p className="text-xl fw-normal py-4 text-center m-0 text-white">
          © 2026 ENTHUSIAST. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
