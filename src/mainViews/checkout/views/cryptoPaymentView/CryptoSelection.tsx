import Image from "next/image";
import styles from "../paypal.module.scss";

interface ICryptoSelection {
  onSelectedCoin: Function;
  coin: string;
  selectedCoin: string;
  uniqueValue: string;
  name: string;
  icon?: "bitcoin" | "usdt" | "usdc";
}

const CryptoSelection = (props: ICryptoSelection) => {
  const { onSelectedCoin, coin, selectedCoin, uniqueValue, name, icon } = props;

  const icons = {
    bitcoin: "/bitcoin.png",
    usdt: "/usdt.png",
    usdc: "/usdc.png",
  };
  const coinSymbol = coin.includes(".") ? coin.split(".")[0] : coin;
  const networkSuffix = coin.includes(".") ? coin.split(".")[1] : "";

  return (
    <div className={styles.coinOption}>
      <input
        className={styles.coinInput}
        type="radio"
        name="flexRadioDefault-new"
        checked={selectedCoin === coin}
        id={uniqueValue}
        onChange={() => {
          onSelectedCoin(coin);
        }}
      />
      <label className={styles.coinCard} htmlFor={uniqueValue}>
        <span className={styles.coinIcon}>
          {icon && (
            <Image
              className={styles.coinImage}
              src={icons[icon]}
              width={22}
              height={22}
              alt={`${name}`}
            />
          )}
        </span>
        <span className={styles.coinText}>
          <span className={styles.coinName}>{name}</span>
          <span className={styles.coinCode}>{coinSymbol}</span>
        </span>
        <span className={styles.coinMeta}>
          {networkSuffix ? (
            <span className={styles.coinNetwork}>{networkSuffix}</span>
          ) : null}
          <span className={styles.coinCheck} aria-hidden="true" />
        </span>
      </label>
    </div>
  );
};

export default CryptoSelection;
