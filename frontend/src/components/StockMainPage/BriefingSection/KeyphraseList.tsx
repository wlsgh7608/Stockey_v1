import styled from "styled-components"
import KeyphraseListItem from "./KeyphraseListItem"
import { useRecoilValue } from "recoil"
import {
  selectedKeywordState,
  keyphraseParamsState,
} from "../../../stores/StockMainAtoms"
import { useKeyphraseList } from "../../../hooks/useKeyphraseList"

export const colors: string[] = ["orange", "pink", "purple"]
const KeyphraseList = () => {
  const { idx: selectedKeywordIdx, id } = useRecoilValue(selectedKeywordState)
  // keyphrase 리스트 읽어오기
  const keyphraseParams = useRecoilValue(keyphraseParamsState)
  const { data: keyphraseListData } = useKeyphraseList(keyphraseParams)
  console.log(keyphraseListData, "keyphraseListData")

  const keyphrases: string[] = [
    "금리 인상",
    "대출 규제",
    "부동산 하락",
    "연준 발표",
  ]
  return (
    <KeyphraseContainer selectedIdx={selectedKeywordIdx}>
      {keyphrases.map((phrase, index) => {
        return (
          <KeyphraseListItem
            key={`keyphrase-${index}`}
            keyphrase={phrase}
            backgroundColor={`var(--custom-${colors[selectedKeywordIdx]}-${
              index + 1
            })`}
            rank={index + 1}
          />
        )
      })}
    </KeyphraseContainer>
  )
}

export default KeyphraseList

const KeyphraseContainer = styled.div<{ selectedIdx: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 24px 0px;
  width: 100%;
  background-color: white;
  border-radius: 36px;
  position: relative;
  height: 30%;

  // 말풍선 꼬리
  ::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: ${({ selectedIdx }) => 50 + (selectedIdx - 1) * 32}%;
    width: 0;
    height: 0;
    border: 2em solid transparent;
    border-top-color: #ffffff;
    border-bottom: 0;
    margin-left: -1.5em;
    margin-bottom: -1.5em;
    z-index: 1;
    transition: left 0.5s ease-in-out;
  }
`
