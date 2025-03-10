import React from 'react'
import { Link } from 'react-router';
import NavBar from '../components/NavBar'
import "../App.css"

function HomePage() {
  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <header>
        <img src="../src/assets/rosedog.jpg" alt="" />
      </header>

      {/* Intro Section */}
      <section className="py-5 w-100 introduction">
        <div className="container-fluid">
          <div className="row align-items-center home-content">
            <div className="col-md-12">
              <h1 className="header">WELCOME TO PELUDITOS</h1>
              <h2>Find Your Purr-fect Match! 🐶🐱</h2>
              <p>At Peluditos, we believe every pet deserves a cariñoso home! 🐾 Whether they’re from shelters, rescues, or loving individuals, our mission is to help every peludito find their furever familia. Just browse, connect, and adopt your next best amigo! </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Grid Section */}
      <section className="container-fluid py-5">
        <div className="row home-content">
          <h2>Meet Our Newest Peluditos!</h2>
          <div className="col-md-4 mb-5">
            <img src="data:image/jpeg;base64,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" className="img-fluid rounded" alt="Adopt a pet" />
            <h3 className="mt-3">Fred</h3>
            <p>Looking for cuddles and adventure? Fred’s got you covered! Give this little guy a warm hogar and a lifetime of belly rubs.</p>
          </div>
          <div className="col-md-4  mb-5">
            <img src="data:image/jpeg;base64,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" className="img-fluid rounded" alt="Success stories" />
            <h3 className="mt-3">Lulu</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porta et orci sed cursus. Aliquam congue porta elit aliquam volutpat. Curabitur sagittis ultrices mi. Aliquam mollis sagittis ipsum, at vestibulum arcu tincidunt a. Mauris at volutpat massa. Sed iaculis ultrices odio vitae viverra.</p>
          </div>
          <div className="col-md-4  mb-5">
            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExIWFhUXFxoYGBcXGBUYGBgYGhcWFxUWGBgYHSggGBolHRcXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0dHR0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS03LTctNzc3LTctLSs3K//AABEIANoA5wMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAEBQIDBgEABwj/xAA9EAABAwIDBQUGBQQCAQUAAAABAAIRAyEEMUEFElFhcQYigZGxEzKhwdHwBxQjQlIVcuHxM4JiFmOSorL/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMABAX/xAAiEQACAgICAgIDAAAAAAAAAAAAAQIRAyESMSJBBBMyUWH/2gAMAwEAAhEDEQA/AMWyirKVETlqusKm0rp0TbFVfDtY94H8j6yuFXbU/wCQ8wD8FQ2m4iQDHFOhD0r0KErpctZjq+r/AIW15w7m8H+q+TEr6P8AhRXkVm/2n1C5/kbgPj7Po78j0Q2z3fpdPkrwULss9144OK8w6DQB1lElV0n90dB6Lpcq3oWiRcuSoby4XJGw0Z/tu79A9RC+btbqeN/mvpXa+nvUCNM/osAyi1wva1uZVMb0CUbLAQ5sMiGmecIzDttBM3tPNKcOHNPQ8YHNNKDxkXAcpEq6OZxYfhXQ6+U+nBa+k8FoIyhY3CPl7RpI+C2gyXNnL4F2cKipFQJXOdBBypeVaVS8ooxU45dVDGFeeVHFFMjCXa3upCaG+3dmLp/tS7Uj3t2TzXRB60JSvYW1u40AXXkFiMcYyEjQ87gry31yfZX7F6Mqwqxp4oTDPloPEBXNddeicTKtqZtPFvonGysQ2lSFhLr36pPtC7WdSPOFPHVNOACnkdIMI2x5SFCsSKlACcn0+6QeMZEckp27sJ+GIO8KlN3u1Ggx0d/F3Je2ViSCLmCtUyo3dLKg3qbgA5vLiOY0KSGWtMpPFq0fPiVufwpqxXqN4s9Cs32g2QcO8bp3qT703cs908HCU2/DWru4wD+TSPQqmXcGRjpn2FqE2aYfUH/lKvpO0KGw5iu8cQCvLZ0DrDnuhSJVGFdY9SrSVjHpUSVGVFxStjIB27uupOaTFvNfPqNKARzPgtbt3ESN0FZfGuaIYzORvHidAmxNt0hnGlbBDThpgyT8P8pVWcQnLwY5RmNUEaAIK7LoSMLHvZSoa0Tm0wePVbyF8/8Aw3qFtd7eLZ8ls6mKIeWmeXNcXyZ1OimPF2woqDivUnleepJmZW5UPKueqHpkAoqFcr5L1UqNY2TGFe0fdSDFjuuWgx3upFVyKvASRVUpBzGkZxfwsuLxcGvA4SPmF5W2IYbZT5pt8kaCgMBYEc0ZK60yZ3FGafQgqyizef4fK6rce67p6XVmzT3mcwo5eimL8hnQpsDt0RPkneHdvCLCbQcuUjRBPwW+NJCuw7D+1wMZgiD4LmR1NE6jBejVADHiDrunR7eBCV7AwbsLtCkx9xvd1wyc05Ecim+JoEtmLjIcV3BPa4sp1LFjg6m7+JB93oVeMnVHPkhu0fRjmhHGMQ3m0q1mIBGaCxdYCrTdOXzXG1RkPcKbu6j0V5KDwlQSeYCKJSMJwqurUAF1CrWAzKUbVxwLT3hGt0rTodGX23jCXOOhNvNLsHT3jOmvNC4nHhz8xF/FHe2G5Gp/bwHM6aLrxQ4xFlLkwuq0PGpA4TAVDmhoVmHhtpM8forcbUDacgSVpMrCJ3sJIxbuG4fVbqpTBdOqwv4fEmvUdP7fmt66pvXA6rj+RuY/SIlQcpFVuSkiD1Q9WuKoqImKKpUK2S7WUXm3gnAA4rJJy26b4k2Sk5qkQMVbQBB5tJ8QRZeVm2mmzvCV5dMVaJswuDfdHJTgXd9Mw5dCZOi1jdORVWBqkbrv4mFOm646oamO89p428P9oT3EaDqSNLgdo72sHVEvqw4Qc9Tb4LMMJBDvA8wnRqNdA+yuWqOu9DtmKMZSUDj6hzGeeXmq8K6Lc/EL1drneByy6wrwWjmnIJw/aCqALmwg8xz6Sqcdtqs50mQMvI/5CZ7G2D7cfp5jgRlFxHGLpbi6/snhrwDNhPERMzrLVThHtkrfo0I7WmgwBzDvbuZKLZ21Jae5FuPxXz3be0/aE72vRTr12totIJLovwixt5ILHBu6A3JI1r9pvxDSA528244HOyXbSovLJ3yJ0n71SXZm2QABeTf4QU1bUFSiImZDb68JT+KVJA3Yi3Sx4OdphM8Fip0knP716JrX2I1tD25fn3WjOYWbo1xvaj74qbKI0NGtU1B8c/EaKnaONMAcvilzcfcBuXiepVtds99xvGXBRa2dWOWjUfh5Rn2lTmAtvvCbBZvsLS3cPzLpPkLLStzgTJECPQrz8jvK0PL8CslVuKk5QcUCZW5UvKteh3omKaqrcbKbyhGusmQCvEZJRUz8U1r5JVWN1WIGDbRbvMjUFeVtZuq8rRehGfKcNVioOqdNWZe+HA9CtG0rqJItCHxJir5H4BXtKGxvvA8R6ImYfh6jXSDbdMX0PBF0KgJiLRnbJDncfSFxvAyeKHoViBGn3lwXP7L8tDWrX0lUHEPyJtx1sg2Ok6+qqxG+7usHU8P8puQnE0Ox9sOpOkP+KD7SYp1Srvxne3HUpC3ZtU5A8ZAKLwVVwdu1JFrE8EG/6bQLiSSCjcG4voEA3E2PDOyliqEA+fghtlvLHEcfqqwkTmhpgcKHNJFoyEaxcdERs6i5hNMG5u3nrKP2bSlhIiSTbxsY4plV2TubtY2AbnHXXSybJ/DQ/oq2vt9rababrhoAAy6yeHPVJG7WZUsWtHC7o+CfbP7Puqg1nM96S2RMNnugcEX/AEum2pSoVWN/WkNteRGviofbug6EhwFZo3txu6dQ6beOSI2XiXU3QQCDYg6yta7YNKi80Gk1GSS2oRJDI91sWJztySHaezdw71MhzeMXHIgZKlBujbbIqUqDNwHmBn7wyTTB1N90NdckAcp1XzvZ2Jc4EkyfvJbXY3/FOt75FcGXGozcikcrl4jWu2HETME3481Q4rzbABRcVEdEHlUPU3lUPcsEqquiUDQqgtsiKz0MDAToxGsbJVXzR9Z1ksruuqRFCGLyUbR2k6nAa2SV5WWOTVonKSTPl2JEHzHxT7BuljTyCT7SbDnf3eqY7IdNPpZdLEGAQ+OyaVeF19MOF8gULoNWLadSHZ5iCjKUSFVuXlGYdoAmfvkkk0Mgim10WyjQXTzZezQ+gXgt3t0wDmTcWHGVn8JjGtdJJz5J1s3arWHukEOzaePEcFHIn6KaaGHZHCO/Ls9oCHEusc4myr7aYJtOjvQN7fBFhPNMWdo6bRO6Serfqsv2n2q6tEiGiwEjzKjBSc76EUdbKsW9vsWgcInnaUuDYIK4X2B8h6qvCy95+4XZFUCbN92cDBA3heDDjEdFqcQAaXsXQd4FrSbCSDBnSCvnOArGN20hazZeKqOBY/KAeecgidLLpXkiF0zT9iH06+FFIwKtPuPGsi2RVu0OzIdUpVahH6D99pGtsjyyWCO1iyo5znlrh7rhbMnOMwo4/tW6oCypVe8RFiIPwC52kmH6m92NNtbUnENbSeN1hkuBO7eSRbqUp/MTVO7BkeA+pWfqYt592wP3kjNm0qk58yjBND+qHlbDbsVADz0kcVruzjd+g4zYevBZ7BHfYdIAsSPNaLYh3aW4P5bx8oCT5ME4cgY35Bziq3FRqPVDqi806iT3Iaq5eqVUO+sBd0xyTJGLBhXvyaY4mwVbsLA71Sm3/tPopntFSaMz5hUO2zhzf2QPP/SOzUUVBRGdWf7WobdpuPdp1Hny9EeNs0BlSb5EqwdpmjJoH31TeRqIYbYb6kH2FNkZF9z5LyvZ2lJ91vkAuIXI3FHwnbTe9PFoPkrNhGzhzld2pSJZTdxtmJuJyVGw3d8jiPRemcvseNCk5q60KZFkjHQHiG6ZK+pSG7EnyVJYTJGi4xjcnkt8UoQRtG+ZXXMi8+Cvrbgs13U69FXUxdoaAeZElNbMyzD1jMAq1wLpk+Q+aBbUgSblENeS08OSDRi6lWaJtlqgjjWNOeZ0yCvpGP29dZUK2BpuBOTs0UxWMsDtbcItI16BaTYnbanW3GGi5rmSA5suLhaAdAsJhq0OFpvlxGoWmobRZSYKdFrW8xE+J4qqlSEcbHuJc17oc2RNpzGqW7S2cM2iPHyXcPUqZkyNYR35d7mSIda8fNqWrDdGbwlVzXRqE+w1XeuGnnBFjxSPF4d28QBfyPkVdSc9hEuHgO96rGNdQeWgWgTa4k2ubLSbC3SyoSbgAiddCOa+d7OxbhVEzByJWvq1yynv02y6MjMGMitPyi4gSppjjE1IQFTErFY3a20qht7Jg5Ak/EoAYTFvP6mJd0aYC8/6q7aOzb6Ru6mLhLcZtmk0d6o0eIWfZhXizjvDWZPhdD1dlUzf2QnoioxvbC4P0MMUxtanNN1psRrmEC3ZL/5nzKlh3mmIDd0aAA+SgdqOB913kSqxbWkLJX2d/oLnG73eauZ2XGr/AIqpu1jwd5FWDbZGjvJyblMXhE0WysKKVMMF4Xkgbtw/xd5OXlFwk3ZRNHzdzgMh8SrtlVIqt6wqa4UcO6HNPAhdxxmxCjVdbJVteo1SSpsdBWFpAMJjXxSTF1g50AZa6yj21Se6I8ZXcJg2k+6ev3kgtDME9kLS3xnP6qWIa2IY2OOfzTSts9nEzwQT2Xgm33ZG0CiqhhCYmw85PCFcKcN3b8vVGvY3dl5MTkLR15rlN4cS7TIDIeXBBmoro4Uzc6KNaiBmLcZRVWt3SY4nyV3Z5uCrAe3rjeOTTLQFkykMXN1ZnDXaKoyiPimOE3TcRmtuOzWDaQd+mW/3BB7fxOxqDHANfUrR3RS0PEuJiE6dsrL43BW2c2XhHOiD4Qm+G3HODT+nUEiP2u4Tw6rK7L23+mNHRNk0w+0aNUD2+8H6VG58uoHBPF0cUkNdpYTeHfpNaR+9oBnlISA4dpdIBHLP7806/PvYzdFVtSmcrRfroUlr4x+8d5pGkix+hRkBFWLwxDgfS6d7M2hYNd0jgk9LE1Ihu6QeUR4JlhcK8Q55CVaCx+KQOgXvyzf4AqqhXgfeShicWRaRyXHKGw82gkbPbmWhV1cDSiCB8Qh/zfNDVapdxPh5IcDfZL0HHBURp8cuaEqYWkOPL6qdHD1XC1M5a2CkNmViIgDqfPIIVH2Mp5WD1MEzdlgLiB7up5hRGzXmP0wAbkuIEHhCZ4HZlRjpLgeQBTN1A6hTlJLo6ccpV5GdGx3ke8xp1gT0XFpW4EleS8x7Z+ecZR3dZQy3p7LVH2IBSPtD2afh2h590mOi9GM7ONo7Qf3W9ApuqwQUBgX90BEV5Isi0BBReW3bbqJlc/PPFsl3ZtMnMgdSEZWwjTlmkeh+wI4l5/d9SpuZxF/RcfS3dfEKeGxZHvDz+aADlzcjejjl1XGDWoeYA1TEsY6+8B81fhqTHyDotYeJn8biSWlrZJIPggKGAeIgX9Oi11bANb3skFhKwqPO6IAOaZS/RqAaeyrZ3hcfsJwsTIOid4oREcRKJxVFzm92xFxKXkxmkIcPs99MhoMzoeHVavA7Ac1m882F8lPs1Wa4E1AJBjp9E22vtVjWbrYM8DkniTYqewXMCAc+Plmgq1cHusdbVpHoUNicWahAZbiZuBrlomGEo0W6hx5n5oqWwUX7P2SXDei3VFVSGw2ZvEXQOIxoZZrr9VdsWoaldgzutJ+zJDmhs0mJcR0hHUdiMi4cTwlO6eDIyjpYlEMoOzP34Libb9l1GK9CSlsRg/Z0lMaWBiwaITB2HbxuF5sjWfkkab7G0gH8sRpC6KThpKa0nTpHgqySDpC3A3IE9if4qwUuCMDOc9URRw86QtwA5AbKPMLiZswrRoSea4m+sHM+aU2nMNISXttgnOwjyTO7Do8UT/6lpj9rvghts9oKdShVYGxvMIHWLLqVWRpnzWgIsimklC0XSUXQuYVWwIHrSwyCr8PjDm4qzE0d6wjoq2bMeTkY9UuhlYxoYlhEEwiPYtgQ4RHJLP6VVOkIujsutM2PRI0MTFNwNhvWsrKGMZfehpV7dl1nEEnRSd2e3jnA4Rr1S2jUynF1w5h78eOnBQ2ZiGM7ufTVGN7LNGcmNJVuH7OwS5s+Oi1o1MrxRm4B5TyUHbWtG6QUyqYB27AJhDjYznfu8QYKyaGYh/PPBJbMzmFfhKb6ju/vEf8AjktPs/szBuBHNaChskN91oHPgi8i9CcWYLE4PdHcm2Yc26AcHzn5L6HjNkk8+lv9pRU2FUOm6EVOzUZkVtDc8b/HRbfsBhqby4kS+RHDwSo7E3cmb3Mgn4SnXZRr6NUbzgxpMEG0p5fiBdn0TDYdsQZnxsimYa2k8gURg6bYBmZyRjKfKFz8R2xY7CgG+ihTY0ZT1RzqLpuJGiiaE6BDiawKpE3nwXdwa+aPbhbXClTpMAExJ42+BWUTcinDU2xlfwRNIKwMHBSYwp1ERs8CF5ee12kLyNMB8VfQ2drXpf8AzU6OA2YRDq1NwP8A7kLWM7JYENj8vTAB/iD8UPiOymAbnRZ5D6LUkG2xHQ7GbKcQWEE8BWt6oDtLs/A4Sm4UmMNV0BokuIGrjKR9tsXs6mTTw2Ga6o2xeDZp8MysvgKjnTJvz+iatWYKZR1H0RmCa42JPgr8FRDhBKY0vZ04gE88h8UjkOkWYbCOt802wmEHLwQ9LbFMASL9PnCZYDFBwncMdQptj0X/AJYKLMODbXoi8OwOu1xjhCKa0Hl1S2ahS/DRcNMqgYd8S87jTkIzT4UJzRlHBgiDedDukjpKKVgboyzcCIlrwOFz8UTh6AMDM8lp6WxwRkI4wB4Qhn4Bg/44nW9lTjoHJA+FoaQCjhQMe5I5QrcHS3m3HeHBHYek4iDb4IKIrkAtwQdmCpVNmP8A2UwRzgFNaFO+7IB6yi6bHNNz/wDr/KrFIRsU4fs/aXBo6ITHdn2i4YSRkYC0GMxrGNku/wDtbyKzWP7QT7oY4cs1S0LTFeI7W1cMCzca6Mpn5K3DfiBUI3nYeW8jPXNJNqOLiS5kDSxHqrdn7RDGGWNjKTkp8SgzxH4iVj/x0GtHFxJPkEtxnb3GxH6Yng0/VLsRU33dx7AM75TwSTF0MRcwCOWnRajDXGds8e4bpqlrSL7oDbdc1l8ftKoHgl73a3Jz81PFUqxHeHjKHGx6hiS3iLmfNOqE2avsP2tr0qzRvmpTdYscSc9ROS+6QvjP4fswNB4fiKg9o091sOLRbM2uV9gw2MY9ocxwcDkQQgzBAK8qzWGtl5awGcfSLuXJfOvxL23+Xb7Fj5qPF4/aPqvoeJxbWMdUcfcEnSwC/PG3douxVd9Z2rjHTQJIq2OKwy+874ozA1e9CErnRRwtTvKrAh/SdvHdmADonmHFNoG+7w4rPUqgEcUZRrmbW8pUGiqNJQxrB7tMdSPRG+2dUG6SWjkAElwO8TJJTejTdHvBrTnF3HxUmh0FUqO6Za55/wDEusmgru3bi6V0WN0MDUzLj4qT6xFmj1QMPKGJB0iCnFB8uADRIzjPqsts8Q7KePTVNaW0Q11gQTwyjQJ46FZoSyO9u/GPVefhabr+yc12hgx8DCV0drf2gah0q+rjgGw0AHiHT8QrKiTTLagcyNy3/Zo+BVZxD3n3z0Baf9rJ7XxNy5xJOgB9bIDZ9aoXb07oB0j4larMb0hsySGu/kZHoUZ/VCG3e13P5cVgn7VeZDnb3SyErbadEEkjz/0luhuNm0q7Vsd9lMjiHwfIhK/6yASfy1Ij+QInrkstS2gDcl3ifqpVsQTYPHQFMgUM9qY4VLBuem9YeaVPY+kxwPunjeEZs7Atqf8AKT4z6oramD/SLA1xEWuY/wAJqAfPBtEh578BW1ttPI98xHGyFxfZbEiXNpkidL+qrb2XxsWouIJGWnXghr9m3+j1TabjALj5qVLaDhrIUX9k8dJ/RNuf3KCxOy8VTMOovJ5NJ9AjoGwqptOTkZ4rQ9l+1FSi9u7UduzJZMtJ6LHsweIJg0qnTcd9FquznZHHurM/QqU7zvkboA4pmlQEfesBUNVjXx7zQ6DMiQCvK/B03NY0Sd4AAk6wIXFKhj5j+Ke1BTwvsg7vVCBA/iLn0Xx9tgtL+IG0vbYiJ91seMzqs2RZNDoD7BKzlGjmp1LKreMqgBxQcCLiToisG6Dc+CX4V0Qj3sIEjqptUOmPcJimyL+eSPqYlj83fH5LG06j0RTBN5Pxt4KbiOma3DVaYvvk/ABMcHXab71uSzGD2fOZPzTehs48YA+7pKQR0/FNGRj6Kn80NDklmKw5DTDpOSCoU3N4my1BNMzGgZ35IsY5jxAEHmIKy2HDvecYGs5eKMc/cHdkjOJnyToRjPFFps0gO5mxQWIrljYdExpEeCBdVdEkj/sD6pVi9pES1xj4hOhWWuxcnP1VeI2k0CHZ+qW4jaBjQjQi8/RKauL3jBEg+azjZrNDRxzHOE9M84+a1ewsBSeQd57YixyXz7A4YEg70jgc1o9m417HCJLdeSxkz6dTpCnG6T98skrxr3B3eLoJHBJf6zviC11tRJUS5xIO+Y4HNMCj6FhKTd0AX1uPqjYtMAaWt5oPZTjuQACIECM0a4T3rkEZcOqixitjGn9oEZmPmiaFNsjutIzBMH48V6hSbu5rogZTrBsRJRQLCKlIZ7otkYAj6q2k8EZg9LeCqZVGUyOFpUXkTYxrdNYtBBrtAuY8F5VMrAjOeK8jYKPydiKpe9znGSSbnqu6KsZrxyVEEhXHAT8kORdHNCDeijBFJ8IynibRKAZkFZRQZkGUDJutDgqTYHBZ3Be8U9pn3RpwUZFIjbDVx9P9JtQba56pXgBmjcP9PVSY5c8NkDU/CVazCiYCop+8fvgjKaBit9HMFsjVUYmg0NzmMjr0TPj0QBGfVNFgaB6WIpvbD5Bytqs9tWi0SDkcnR8Cm1cd4pZjj3HfeiunZOhBh6Q3ozngVd/T72nL5qqh77USxx38+PotZki11EtAmDazmn14KVDaBFhnrpPNUMN3DkvYVo3jbVAxo8C7Izn+1M24hv8AEyPvis9T90dU2oe63qigM+k9m6u9SAsOtvCdUzfvaQeICR9k2j2TrfuC0VQW8UkuwooFTcJBvPKYVhe2AZAHC+fMIGo874uVTjj3h4JbDQxeYA3Yk8yusBBym2d7clFxv/1+ijhz344hZGL3ObOQHUa9V5V1Mz1XFrAf/9k=" className="img-fluid rounded" alt="Get Involved" />
            <h3 className="mt-3">Paquita</h3>
            <p>Paquita Paquita Paquita Paquita Paquita. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porta et orci sed cursus. Aliquam congue porta elit aliquam volutpat. Curabitur sagittis ultrices mi. Aliquam mollis sagittis ipsum, at vestibulum arcu tincidunt a. Mauris at volutpat massa. Sed iaculis ultrices odio vitae viverra.</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-5 w-100 banner">
        <div className="container-fluid">
          <div className="row align-items-center home-content">
            <div className="col-md-6">
              <h2>🏡 What Our Adopters Say</h2>
              <p>"Adopting my pet was the best decision I ever made. The process was seamless, and I found my perfect companion. Lorem ipsum dolor sit amet, consectetur adipiscing elit"</p>
            </div>
            <div className="col-md-6 text-center">
              <img src="https://media-be.chewy.com/wp-content/uploads/2023/06/02174255/cat-cuddles.jpg" className="img-fluid rounded" alt="Happy pet owner" />
            </div>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section className="py-5 w-100 donate">
        <div className="container-fluid text-center">
          <h2>💖 Donate and Change Lives</h2>
          <div className="row mt-4 home-content">
            <div className="col-md-6">

              <img src="https://media.4-paws.org/2/a/1/3/2a13e40ef93cc3587d7eb4bfdb9ba433231a8bf2/VIER%20PFOTEN_2016-09-18_081-1927x1333.jpg" className="img-fluid rounded" alt="Help pets" />

              <p className="mt-3">Your help allows us to connect more animals with loving homes. Every donation supports shelters and organizations in their incredible work. Join the cause!</p>
              <Link to="/donate" className="btn btn-primary me-2 mb-5">Donate Now</Link>
            </div>
            <div className="col-md-6">
              <img src="https://www.rocklinranchvet.com/blog/wp-content/uploads/2024/10/iStock-1433858575-6-1.jpg" className="img-fluid rounded" alt="Support our mission" />
              <p className="mt-3">From the match to the first hug, discover how adoption works in just a few simple steps.</p>
              <Link to="/adoption" className="btn btn-secondary mb-5">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}


export default HomePage;
