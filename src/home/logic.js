class Component extends DCLogic {
  state = { quoteIndex: 0, paused: false, hovered: false, focused: false, hidden: false, reducedMotion: false, category: 'all', query: '' };
  _mounted = false;
  _timer = null;

  componentDidMount() {
    this._mounted = true;
    this._motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    this._onMotion = () => this.setState(s => ({ reducedMotion: this._motion.matches, paused: this._motion.matches ? true : s.paused }));
    this._onVisibility = () => this.setState({ hidden: document.hidden });
    this._motion.addEventListener('change', this._onMotion);
    document.addEventListener('visibilitychange', this._onVisibility);
    this.setState({ reducedMotion: this._motion.matches, paused: this._motion.matches, hidden: document.hidden });
    this.syncTimer();
  }

  componentDidUpdate() { this.syncTimer(); }
  componentWillUnmount() {
    this._mounted = false;
    clearInterval(this._timer);
    this._timer = null;
    this._motion?.removeEventListener('change', this._onMotion);
    document.removeEventListener('visibilitychange', this._onVisibility);
  }

  canAdvance() {
    const s = this.state;
    return this._mounted && !s.paused && !s.hovered && !s.focused && !s.hidden && HOME_CONTENT.quotes.length > 1;
  }

  syncTimer() {
    if (this.canAdvance()) {
      if (this._timer === null) this._timer = setInterval(() => this.moveQuote(1), 9000);
    } else {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  moveQuote = step => this.setState(s => ({ quoteIndex: (s.quoteIndex + step + HOME_CONTENT.quotes.length) % HOME_CONTENT.quotes.length }));
  previousQuote = () => this.moveQuote(-1);
  nextQuote = () => this.moveQuote(1);
  togglePlayback = () => this.setState(s => ({ paused: !s.paused }));
  enterQuotes = () => this.setState({ hovered: true });
  leaveQuotes = () => this.setState({ hovered: false });
  focusQuotes = () => this.setState({ focused: true });
  blurQuotes = event => { if (!event.currentTarget.contains(event.relatedTarget)) this.setState({ focused: false }); };
  search = event => this.setState({ query: event.target.value });
  clearSearch = () => this.setState({ query: '', category: 'all' });

  renderVals() {
    const quote = HOME_CONTENT.quotes[this.state.quoteIndex];
    const query = this.state.query.trim().toLocaleLowerCase();
    const categories = [
      ['all', '全部'], ['episodes', '单集导读'], ['series', '为了华语电影'], ['extras', '专题与书单']
    ].map(([id, name]) => {
      const selected = this.state.category === id;
      return { id, name, selected, count: HOME_EPISODES.filter(e => id === 'all' || e.category === id).length,
        color: selected ? '#f4eee0' : '#4e463b', background: selected ? '#211c17' : 'transparent',
        border: selected ? '#211c17' : '#c9bfae', onSelect: () => this.setState({ category: id }) };
    });
    const entries = HOME_EPISODES.filter(e => (this.state.category === 'all' || e.category === this.state.category)
      && (!query || `${e.num} ${e.title} ${e.sub} ${e.desc}`.toLocaleLowerCase().includes(query)))
      .map(e => ({ ...e, hasImage: Boolean(e.img), noImage: !e.img,
        categoryLabel: e.category === 'series' ? '华语专题' : e.category === 'episodes' ? '单集导读' : '专题与书单' }));
    const waiting = this.state.hovered || this.state.focused;
    return {
      show: HOME_CONTENT.show,
      hosts: HOME_CONTENT.hosts,
      checkedAt: HOME_CONTENT.checkedAt,
      total: HOME_EPISODES.length,
      seriesCount: HOME_EPISODES.filter(e => e.category === 'series').length,
      episodeCount: HOME_EPISODES.filter(e => e.category === 'episodes').length,
      quote: { ...quote, target: quote.href.startsWith('https:') ? '_blank' : '_self' },
      quoteNumber: String(this.state.quoteIndex + 1).padStart(2, '0'),
      quoteTotal: String(HOME_CONTENT.quotes.length).padStart(2, '0'),
      quoteAnimation: this.state.reducedMotion || this.state.paused || waiting ? 'none' : 'quote-arrive 550ms ease-out both',
      playbackLabel: this.state.paused ? '继续轮播' : '暂停轮播',
      playbackAria: this.state.paused ? '开始金句轮播' : '暂停金句轮播',
      playbackIcon: this.state.paused ? '▶' : 'Ⅱ',
      quoteStatus: this.state.paused ? '已暂停 · 可手动翻阅' : waiting ? '阅读时暂停' : '每 9 秒自动换一句',
      previousQuote: this.previousQuote, nextQuote: this.nextQuote, togglePlayback: this.togglePlayback,
      enterQuotes: this.enterQuotes, leaveQuotes: this.leaveQuotes, focusQuotes: this.focusQuotes, blurQuotes: this.blurQuotes,
      categories, entries, resultCount: entries.length, empty: entries.length === 0,
      query: this.state.query, onSearch: this.search, clearSearch: this.clearSearch,
      transition: this.state.reducedMotion ? 'none' : 'border-color 160ms ease, background-color 160ms ease'
    };
  }
}
