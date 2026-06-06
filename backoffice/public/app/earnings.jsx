/* Caterists, Earnings, payouts & invoices. */
function EarningsScreen() {
  const e = EARNINGS;
  return (
    <div className="tablo-in">
      <PageHead title="Earnings" sub="Every booking settles through Caterists with one invoice. Payouts land weekly.">
        <Button variant="outline" size="sm" className="gap-1.5"><Icon name="download" className="size-4" />Export</Button>
      </PageHead>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl border bg-card p-4"><MiniStat icon="banknote" tone="success" value={fmtEUR(e.thisMonthNet)} label="Net this month" delta={`+${Math.round((e.thisMonthNet / e.lastMonthNet - 1) * 100)}%`} /></div>
        <div className="rounded-xl border bg-card p-4"><MiniStat icon="wallet" tone="brand" value={fmtEUR(e.pendingPayout)} label="Pending payout" /></div>
        <div className="rounded-xl border bg-card p-4"><MiniStat icon="check-check" tone="muted" value={e.completedOrders} label="Orders this month" /></div>
        <div className="rounded-xl border bg-card p-4"><MiniStat icon="receipt" tone="muted" value={fmtEUR(e.avgOrder)} label="Avg order value" /></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* chart */}
        <div className="lg:col-span-2 rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Net earnings</h3>
              <p className="text-xs text-muted-foreground">After Caterists's 12% take-rate · last 7 months</p>
            </div>
            <Chip tone="success" icon="trending-up">+204% since Dec</Chip>
          </div>
          <BarChart data={e.series} height={180} />
        </div>

        {/* next payout + take-rate */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><Icon name="calendar-clock" className="size-4 text-brand" />Next payout</h3>
            <div className="text-2xl font-bold tabular">{fmtEUR(e.next.net)}</div>
            <div className="text-sm text-muted-foreground mt-1">{e.next.orders} orders · {e.next.date}</div>
            <div className="mt-4 pt-3 border-t space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Gross</span><span className="tabular font-medium">{fmtEUR(e.next.net / (1 - e.takeRate), 2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Caterists fee (12%)</span><span className="tabular font-medium text-muted-foreground">−{fmtEUR(e.next.net / (1 - e.takeRate) * e.takeRate, 2)}</span></div>
              <div className="flex justify-between font-semibold"><span>You receive</span><span className="tabular">{fmtEUR(e.next.net)}</span></div>
            </div>
          </div>
          <div className="rounded-xl border border-brand/20 bg-brand/5 p-5">
            <div className="flex items-center gap-2 mb-1.5"><Icon name="info" className="size-4 text-brand" /><span className="font-semibold text-sm">How pricing works</span></div>
            <p className="text-xs text-foreground/75 leading-relaxed">Caterists takes <span className="font-semibold text-brand">12%</span> on confirmed orders, no listing fees, no monthly cost. Pro is optional and adds analytics, planning tools and a wider delivery radius. It never buys priority, orders always go first-come.</p>
            <Button variant="outline" size="sm" className="gap-1.5 mt-3"><Icon name="sparkles" className="size-3.5" />Preview Caterists Pro</Button>
          </div>
        </div>
      </div>

      {/* payouts table */}
      <div className="rounded-xl border bg-card mt-6 overflow-hidden">
        <div className="flex items-center justify-between p-5 pb-3">
          <h3 className="font-semibold">Recent payouts</h3>
          <button className="text-sm text-brand hover:underline">View all</button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-5">Payout</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead className="text-right">Gross</TableHead>
              <TableHead className="text-right">Fee</TableHead>
              <TableHead className="text-right pr-5">Net</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {e.payouts.map(p => (
              <TableRow key={p.id}>
                <TableCell className="pl-5 font-medium">{p.id}</TableCell>
                <TableCell className="text-muted-foreground">{p.date}</TableCell>
                <TableCell className="text-muted-foreground tabular">{p.orders}</TableCell>
                <TableCell className="text-right tabular">{fmtEUR(p.gross, 2)}</TableCell>
                <TableCell className="text-right tabular text-muted-foreground">−{fmtEUR(p.fee, 2)}</TableCell>
                <TableCell className="text-right tabular font-semibold pr-5">{fmtEUR(p.net, 2)}</TableCell>
                <TableCell><Chip tone="success" icon="check">Paid</Chip></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

Object.assign(window, { EarningsScreen });
