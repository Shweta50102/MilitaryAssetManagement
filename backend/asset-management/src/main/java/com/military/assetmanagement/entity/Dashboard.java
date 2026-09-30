package com.military.assetmanagement.entity;

public class Dashboard {

    private int openingBalance;
    private int purchases;
    private int transferIn;
    private int transferOut;
    private int netMovement;
    private int assigned;
    private int expended;
    private int closingBalance;

    public int getOpeningBalance() {
        return openingBalance;
    }

    public void setOpeningBalance(int openingBalance) {
        this.openingBalance = openingBalance;
    }

    public int getPurchases() {
        return purchases;
    }

    public void setPurchases(int purchases) {
        this.purchases = purchases;
    }

    public int getTransferIn() {
        return transferIn;
    }

    public void setTransferIn(int transferIn) {
        this.transferIn = transferIn;
    }

    public int getTransferOut() {
        return transferOut;
    }

    public void setTransferOut(int transferOut) {
        this.transferOut = transferOut;
    }

    public int getNetMovement() {
        return netMovement;
    }

    public void setNetMovement(int netMovement) {
        this.netMovement = netMovement;
    }

    public int getAssigned() {
        return assigned;
    }

    public void setAssigned(int assigned) {
        this.assigned = assigned;
    }

    public int getExpended() {
        return expended;
    }

    public void setExpended(int expended) {
        this.expended = expended;
    }

    public int getClosingBalance() {
        return closingBalance;
    }

    public void setClosingBalance(int closingBalance) {
        this.closingBalance = closingBalance;
    }
}