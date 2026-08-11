import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, Receipt, DollarSign, ChevronRight, Plus } from 'lucide-react-native';

export default function DashboardScreen() {
  const transactions = [
    { id: '1', title: 'Acme Corp - Invoice #1024', category: 'Sale', amount: '+$3,450.00', date: 'Today, 2:45 PM', type: 'profit' },
    { id: '2', title: 'AWS Cloud Services', category: 'Expense', amount: '-$284.50', date: 'Today, 11:15 AM', type: 'loss' },
    { id: '3', title: 'Office Supplies Ltd', category: 'Expense', amount: '-$125.00', date: 'Yesterday', type: 'loss' },
    { id: '4', title: 'Client Payment - TechSoft', category: 'Sale', amount: '+$  1,800.00', date: '08 Aug 2026', type: 'profit' },
  ];

  return (
    <ScrollView className="flex-1 bg-background px-4 pt-12">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <View>
          <Text className="text-sm font-medium text-muted-foreground">Welcome back</Text>
          <Text className="text-2xl font-bold text-foreground">LedgerFlow</Text>
        </View>
        <Pressable className="w-10 h-10 rounded-full bg-primary-container items-center justify-center">
          <Text className="text-white font-bold">LF</Text>
        </Pressable>
      </View>

      {/* Main Net Balance Summary Card */}
      <View className="bg-primary-container p-5 rounded-2xl mb-6 shadow-md">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-on-primary-container text-sm font-medium">Total Net Balance</Text>
          <View className="bg-white/20 px-2.5 py-1 rounded-full flex-row items-center gap-1">
            <TrendingUp size={14} color="#ffffff" />
            <Text className="text-xs text-white font-semibold">+12.4%</Text>
          </View>
        </View>
        <Text className="text-white text-3xl font-bold mb-4">$42,850.50</Text>

        <View className="flex-row gap-3 pt-3 border-t border-white/20">
          <View className="flex-1">
            <Text className="text-on-primary-container text-xs">Monthly Income</Text>
            <Text className="text-white font-semibold text-base">+$12,450.00</Text>
          </View>
          <View className="w-px bg-white/20" />
          <View className="flex-1">
            <Text className="text-on-primary-container text-xs">Monthly Expense</Text>
            <Text className="text-white font-semibold text-base">-$3,120.00</Text>
          </View>
        </View>
      </View>

      {/* Action Chips / Quick Buttons */}
      <View className="flex-row gap-3 mb-6">
        <Button className="flex-1 bg-primary rounded-xl h-12 flex-row items-center justify-center gap-2">
          <Plus size={18} color="#ffffff" />
          <ButtonText className="text-white font-semibold">New Entry</ButtonText>
        </Button>
        <Button variant="outline" className="flex-1 border-border rounded-xl h-12 flex-row items-center justify-center gap-2">
          <Receipt size={18} color="#00339d" />
          <ButtonText className="text-primary font-semibold">Invoices</ButtonText>
        </Button>
      </View>

      {/* Financial Status Metrics Grid */}
      <View className="flex-row gap-3 mb-6">
        <View className="flex-1 bg-card p-4 rounded-xl border border-border shadow-xs">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xs text-muted-foreground font-medium">Sales & Income</Text>
            <View className="w-7 h-7 rounded-lg bg-profit-container items-center justify-center">
              <ArrowUpRight size={16} color="#12B76A" />
            </View>
          </View>
          <Text className="text-lg font-bold text-profit">+$18,920</Text>
          <Text className="text-[11px] text-muted-foreground mt-1">24 transactions</Text>
        </View>

        <View className="flex-1 bg-card p-4 rounded-xl border border-border shadow-xs">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xs text-muted-foreground font-medium">Total Expenses</Text>
            <View className="w-7 h-7 rounded-lg bg-loss-container items-center justify-center">
              <ArrowDownRight size={16} color="#F04438" />
            </View>
          </View>
          <Text className="text-lg font-bold text-loss">-$4,210</Text>
          <Text className="text-[11px] text-muted-foreground mt-1">12 transactions</Text>
        </View>
      </View>

      {/* Recent Ledger Entries */}
      <View className="mb-8">
        <View className="flex-row justify-between items-center mb-3 px-1">
          <Text className="text-base font-bold text-foreground">Recent Ledger Entries</Text>
          <Pressable className="flex-row items-center gap-0.5">
            <Text className="text-xs font-semibold text-primary">View All</Text>
            <ChevronRight size={14} color="#00339d" />
          </Pressable>
        </View>

        <View className="gap-2.5">
          {transactions.map((item) => (
            <View key={item.id} className="bg-card p-4 rounded-xl border border-border flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className={`w-10 h-10 rounded-lg items-center justify-center ${item.type === 'profit' ? 'bg-profit-container' : 'bg-loss-container'}`}>
                  {item.type === 'profit' ? (
                    <ArrowUpRight size={20} color="#12B76A" />
                  ) : (
                    <ArrowDownRight size={20} color="#F04438" />
                  )}
                </View>
                <View>
                  <Text className="text-sm font-bold text-foreground">{item.title}</Text>
                  <Text className="text-xs text-muted-foreground">{item.date} • {item.category}</Text>
                </View>
              </View>
              <Text className={`text-sm font-bold ${item.type === 'profit' ? 'text-profit' : 'text-loss'}`}>
                {item.amount}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}