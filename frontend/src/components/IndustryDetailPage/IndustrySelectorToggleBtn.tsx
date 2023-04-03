import Button from "@mui/material/Button"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import styled from "@emotion/styled"
import { useEffect, useState } from "react"

interface BtnProps {
  changeLayout: (e: React.MouseEvent<HTMLElement>, mode: string) => void
  status: string
}

const IndustrySelectorToggleBtn = ({ changeLayout, status }: BtnProps) => {
  const [isSelectorOn, setIsSelectorOn] = useState<boolean>(false)
  useEffect(() => {
    if (status.endsWith("sel")) {
      setIsSelectorOn(true)
    } else {
      setIsSelectorOn(false)
    }
  }, [status])
  return (
    <StyledButton
      endIcon={
        isSelectorOn ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
      }
      onClick={(e) => {
        changeLayout(e, "sel")
        setIsSelectorOn((prev) => !prev)
      }}
      className={isSelectorOn ? "small" : ""}
    >
      <ButtonImg src="/industryLogos/sampleIndustryLogo.png" alt="" />
      {isSelectorOn ? "접기" : "다른산업보기"}
    </StyledButton>
  )
}

export default IndustrySelectorToggleBtn

const StyledButton = styled(Button)({
  width: "170.52px",
  height: "4.8rem",
  background: "var(--custom-gradient-pink)",
  borderRadius: 24,
  paddingLeft: 6,
  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "1.4rem",
  lineHeight: "2rem",
  letterSpacing: "0.1px",
  color: "#FFFFFF",
  "&.small": {
    width: "114.15px",
  },
  transition: "all 0.6s forwards",
})

const ButtonImg = styled.img`
  height: 100%;
  margin-right: 12px;
`
