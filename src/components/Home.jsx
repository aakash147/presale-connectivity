import { formatUnits, parseUnits } from "@ethersproject/units";
import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";

import { usePresaleContract } from "../ConnectivityAss/hooks";
import { AppContext } from "../utils";

function Home() {
  const { account, signer } = useContext(AppContext);
  const [amount, setAmount] = useState("");
  let presaleContract = usePresaleContract(signer);
  console.log("presaleContract: ", presaleContract);

  // ---------Read Funtions of presale------------------
  useEffect(async () => {
    let raisedAmount = await presaleContract.amountRaised();
    console.log(formatUnits(raisedAmount.toString()), "raised amount");

    let tokenBalance = await presaleContract.getContractTokenBalance();
    console.log(+formatUnits(tokenBalance.toString()), "Token balance");

    let soldToken = await presaleContract.soldToken();
    console.log(+formatUnits(soldToken.toString()), "sold tokens");

    let tokenBnb = await presaleContract.tokenPerBnb();
    console.log(+tokenBnb, "token per bnb");

    let privateSale = await presaleContract.totalForPrivateSale();
    console.log(+formatUnits(privateSale.toString()), "private presale");
  }, []);

  //  read ka asa function jo bsc mein ek input field rkhta ho usko alg useEffect mein call krna hota hai
  // r bsc mein uski value dkhni hai k kia hai jesy nechy wly function mein amount chye thi toh hm amount
  // send kr rhy hain r useEffect mein b amount ki dependncy b lgy gi
  useEffect(async () => {
    try {
      let bnbTokenAmount = await presaleContract.bnbToToken(
        parseUnits(amount.toString())
      );
      console.log(+formatUnits(bnbTokenAmount.toString()), "BNB token amount");
    } catch (error) {
      console.log(error);
    }
  }, [amount]);
  ////////////////////////////////////////////////////////////////////////

  // ---------Write functions----------------
  const buyFunction = async () => {
    try {
      if (account) {
        // to call a write function for payable amount syntax is written below
        const payableAmount = await presaleContract.buyToken({
          value: parseUnits("0.01".toString()),
        });

        console.log(payableAmount, "payable amount");
        await payableAmount.wait();
        toast.success("Transation completed!");
      } else {
        toast.error("Error! Please connect your wallet");
      }
    } catch (error) {
      console.log(error);
      if (error?.data?.message) {
        toast.error(error?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
  };
  //////////////////////////////////////////////

  return (
    <Box>
      <Box color="black">Token Connectivity</Box>
      <Box mb={4}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Box>

      <Button
        disableRipple={true}
        sx={{
          backgroundColor: "#202124",
          color: "white",
          width: "100px",
          borderRadius: "20px",
          marginLeft: "30px",
          "&:hover": {
            backgroundColor: "#202124a1",
          },
        }}
        onClick={buyFunction}
      >
        Buy
      </Button>
    </Box>
  );
}

export default Home;
