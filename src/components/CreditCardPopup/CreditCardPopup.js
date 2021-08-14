import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import theme from 'styles/theme';

const CreditCardPopup = ({ onClose, saveCardInfo }) => {
  const [inputs, setInputs] = useState({
    card1: '',
    card2: '',
    card3: '',
    card4: '',
    month: '',
    year: '',
    cvc: '',
  });

  const [caution, setCaution] = useState('');

  const cardNumberRefs = useRef([]);

  const { card1, card2, card3, card4, month, year, cvc } = inputs;

  const onChange = (e) => {
    let { value, name } = e.target;
    value = value.replace(/[^0-9]/g, '');

    const idx = cardNumberRefs.current.findIndex((ref) => ref === e.target);

    if (idx !== -1 && idx !== 3 && value.length === 4) {
      cardNumberRefs.current[idx + 1].focus();
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const effectiveDateValidation = () => {
    if (month <= 0 || month > 12) {
      setCaution('월은 1 ~ 12 사이의 값만 가능합니다');
      return false;
    }

    const date = new Date();
    const currentYear = date.getFullYear() % 100;
    const currentMonth = date.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      setCaution('유효기간이 만료된 카드입니다');
      return false;
    }

    setCaution('');
    return true;
  };

  const format = (n) => (n.length === 1 ? `0${n}` : n);

  const onConfirmClick = (e) => {
    e.preventDefault();

    if (effectiveDateValidation()) {
      saveCardInfo((prev) => ({
        ...prev,
        ['cardNumber']: `${card1} - ${card2} - ${card3} - ${card4}`,
        ['effectiveDate']: `${format(month)} / ${format(year)}`,
        ['cvc']: cvc,
      }));

      onClose();
    }
  };

  return (
    <Container onClick={({ target }) => !target.closest('table') && onClose()}>
      <Form onSubmit={onConfirmClick}>
        <Table>
          <thead>
            <tr>
              <th>신용카드 정보 입력</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>카드번호</td>
            </tr>
            <tr>
              <td>
                {[0, 1, 2, 3].map((i) => (
                  <React.Fragment key={i}>
                    <StyledInput
                      ref={(r) => (cardNumberRefs.current[i] = r)}
                      type='text'
                      name={`card${i + 1}`}
                      value={inputs[`card${i + 1}`]}
                      minLength='4'
                      maxLength='4'
                      required
                      autoComplete='off'
                      autoFocus={i === 0}
                      onChange={onChange}
                    />
                    {i !== 3 && <span>-</span>}
                  </React.Fragment>
                ))}
              </td>
            </tr>
            <tr>
              <td>
                유효기간
                {caution && <Caution>{caution}</Caution>}
              </td>
            </tr>
            <tr>
              <td>
                <StyledInput type='text' name='month' value={month} placeholder='월' maxLength='2' required autoComplete='off' onChange={onChange} />
                <span>/</span>
                <StyledInput type='text' name='year' value={year} placeholder='년' maxLength='2' required autoComplete='off' onChange={onChange} />
              </td>
            </tr>
            <tr>
              <td>CVC번호</td>
            </tr>
            <tr>
              <td>
                <StyledInput type='text' name='cvc' value={cvc} minLength='3' maxLength='3' required autoComplete='off' onChange={onChange} />
                <Hint>카드 뒷면 마지막 3자리 숫자</Hint>
              </td>
            </tr>
            <tr>
              <td>
                <StyledButton type='submit'>확인</StyledButton>
                <StyledButton type='reset' onClick={onClose}>
                  취소
                </StyledButton>
              </td>
            </tr>
          </tbody>
        </Table>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(80, 80, 80, 0.5);
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Table = styled.table`
  background-color: #fff;
  border-radius: 10px;

  & > :first-child > tr > th {
    font-size: 18px;
    font-weight: 600;
    padding: 30px;
    text-align: center;
  }

  & > tbody > tr > td {
    padding: 10px 50px;
  }

  & > tbody > tr > td > span {
    padding: 0 10px;
  }

  & > tbody > :last-child > td {
    text-align: right;
    padding-bottom: 30px;
  }

  & > tbody > :last-child > td :first-child {
    margin-right: 20px;
    background-color: ${theme.colors.blue};
    color: #fff;
  }
`;

const Hint = styled.span`
  font-size: 13px;
  color: #808080;
`;

const Caution = styled.span`
  font-size: 14px;
  color: red;
`;

const StyledInput = styled.input`
  ${theme.common.input}
  width: 70px;
  padding: 10px 0 10px 10px;

  :focus {
    color: ${({ theme }) => theme.colors.blue};
    background-color: rgba(0, 133, 253, 0.1);
    border: 0.5px solid ${({ theme }) => theme.colors.blue};
  }
`;

const StyledButton = styled.button`
  ${theme.common.button}
  padding: 10px 30px;
`;

CreditCardPopup.propTypes = {
  onClose: PropTypes.func,
  saveCardInfo: PropTypes.func,
};

export default CreditCardPopup;
