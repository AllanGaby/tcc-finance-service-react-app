import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FinanceAccountModel, FinanceTransactionModel, FinanceTransactionType } from '../../../domain/finance'
import { BarChart, useService } from '../../../presentation/common'
import { Flex, Heading } from '@chakra-ui/react'

type FinanceAccountResumeModel = {
  account_name: string
  credit: number
  debit: number
}

export const DashboardPage: React.FC = () => {
  const [listFinanceTransaction, setFinanceTransaction] = useState<FinanceTransactionModel[]>([])
  const [listFinanceAccountRenumeValue, setListFinanceAccountRenumeValue] = useState<FinanceAccountResumeModel[]>([])
  const [listFinanceAccountRenumeQuantity, setListFinanceAccountRenumeQuantity] = useState<FinanceAccountResumeModel[]>([])
  const [listFinanceAccount, setListFinanceAccount] = useState<FinanceAccountModel[]>([])
  const { list } = useService()

  useEffect(() => {
    handleFinanceTransaction()
    handleFinanceAccount()
  }, [])

  useEffect(() => {
    const newFinanceAccountRenumeValue: FinanceAccountResumeModel[] = []
    const newFinanceAccountRenumeQuantity: FinanceAccountResumeModel[] = []
    listFinanceAccount.map(financeAccount => {
      let creditValue: number = 0
      let debitValue: number = 0
      let creditQuantity: number = 0
      let debitQuantity: number = 0
      listFinanceTransaction
        .filter(financeTransaction => financeTransaction.finance_account_id === financeAccount.id)
        .map(financeTransaction => {
          const value = Number(financeTransaction.value)
          creditValue += financeTransaction.type === FinanceTransactionType.Credit ? value : 0
          debitValue += financeTransaction.type === FinanceTransactionType.Debit ? value : 0
          creditQuantity += financeTransaction.type === FinanceTransactionType.Credit ? 1 : 0
          debitQuantity += financeTransaction.type === FinanceTransactionType.Debit ? 1 : 0
        })
      newFinanceAccountRenumeValue.push({
        account_name: financeAccount.name,
        credit: creditValue,
        debit: debitValue
      })
      newFinanceAccountRenumeQuantity.push({
        account_name: financeAccount.name,
        credit: creditQuantity,
        debit: debitQuantity
      })
    })
    setListFinanceAccountRenumeValue(newFinanceAccountRenumeValue)
    setListFinanceAccountRenumeQuantity(newFinanceAccountRenumeQuantity)
  }, [listFinanceTransaction, listFinanceAccount])

  const handleFinanceTransaction = useCallback(async () => {
    const response = await list<FinanceTransactionModel>({
      endPoint: '/finance/finance-transaction',
      entityName: 'FinanceTransaction',
      filter: {
        recordsPerPage: 99999
      }
    })
    setFinanceTransaction(response.data)
  }, [])

  const handleFinanceAccount = useCallback(async () => {
    const response = await list<FinanceAccountModel>({
      endPoint: '/finance/finance-account',
      entityName: 'FinanceAccount',
      filter: {
        recordsPerPage: 99999
      }
    })
    setListFinanceAccount(response.data)
  }, [])

  const handleFinanceAccountResumeValueChart = useMemo(() =>
    <Flex
      flexDirection={'column'}
    >
      <Heading>Resumo das contas por valor</Heading>
      <BarChart
        height={260}
        width={300}
        xAxisKey='account_name'
        total={''}
        legends={[{
          text: 'Crédito',
          key: 'credit',
          color: 'green'
        }, {
          text: 'Débito',
          key: 'debit',
          color: 'red'
        }]}
        data={listFinanceAccountRenumeValue}
        onChangeParams={undefined}
        isCurrencyValue={true}
      />
    </Flex>
  , [listFinanceTransaction, listFinanceAccount, listFinanceAccountRenumeValue])

  const handleFinanceAccountResumeQuantityChart = useMemo(() =>
    <Flex
      flexDirection={'column'}
    >
      <Heading>Resumo das contas por quantidade</Heading>
      <BarChart
        height={260}
        width={300}
        xAxisKey='account_name'
        total={''}
        legends={[{
          text: 'Crédito',
          key: 'credit',
          color: 'green'
        }, {
          text: 'Débito',
          key: 'debit',
          color: 'red'
        }]}
        data={listFinanceAccountRenumeQuantity}
        onChangeParams={undefined}
        isCurrencyValue={false}
      />
    </Flex>
  , [listFinanceTransaction, listFinanceAccount, listFinanceAccountRenumeQuantity])

  return (
    <Flex
      width={'100%'}
      overflow={'auto'}
      flexDirection={'column'}
    >
      {handleFinanceAccountResumeValueChart}
      {handleFinanceAccountResumeQuantityChart}
    </Flex>
  )
}
