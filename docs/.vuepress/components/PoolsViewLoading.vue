<template>
  <div class="header">
    <TextSkeleton :fontSize="18" :width="300" />
    <TextSkeleton :fontSize="14" :width="575" />
  </div>
  <div class="columns">
    <div class="details">
      <p class="detail__heading">Pool Tokens</p>
      <div class="asset-list">
        <div class="asset">
          <div class="asset__header">
            <div
              style="
                width: 36px;
                height: 36px;
                border-radius: 99px;
                background-color: #e2e8f0;
              "
            />
            <div class="flex-1">
              <TextSkeleton :fontSize="14" :lineHeight="1.2" />
              <TextSkeleton :fontSize="14" :width="200" />
            </div>
            <TextSkeleton :fontSize="16" />
          </div>
          <div class="asset__details">
            <TextSkeleton :fontSize="14" :width="175" />
            <TextSkeleton :fontSize="14" :width="100" />
            <TextSkeleton :fontSize="14" :width="300" />
          </div>
        </div>
        <div class="asset">
          <div class="asset__header">
            <div
              style="
                width: 36px;
                height: 36px;
                border-radius: 99px;
                background-color: #e2e8f0;
              "
            />
            <div class="flex-1">
              <TextSkeleton :fontSize="14" :lineHeight="1.2" />
              <TextSkeleton :fontSize="14" :width="200" />
            </div>
            <TextSkeleton :fontSize="16" />
          </div>
          <div class="asset__details">
            <TextSkeleton :fontSize="14" :width="175" />
            <TextSkeleton :fontSize="14" :width="100" />
            <TextSkeleton :fontSize="14" :width="300" />
          </div>
        </div>
        <div class="asset">
          <div class="asset__header">
            <div
              style="
                width: 36px;
                height: 36px;
                border-radius: 99px;
                background-color: #e2e8f0;
              "
            />
            <div class="flex-1">
              <TextSkeleton :fontSize="14" :lineHeight="1.2" />
              <TextSkeleton :fontSize="14" :width="200" />
            </div>
            <TextSkeleton :fontSize="16" />
          </div>
          <div class="asset__details">
            <TextSkeleton :fontSize="14" :width="175" />
            <TextSkeleton :fontSize="14" :width="100" />
            <TextSkeleton :fontSize="14" :width="300" />
          </div>
        </div>
      </div>
    </div>
    <div class="right-col">
      <div class="queries-card"></div>
    </div>
  </div>
</template>
<style scoped>
p {
  margin: 0;
}

.flex-1 {
  flex: 1;
}

.header {
  padding-top: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;
}

.columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 36px;
  padding: 24px 0 0;
}

.right-col {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.detail__heading {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}

.asset-list > * + * {
  border-top: 1px solid #e2e8f0;
}

.asset {
  font-size: 14px;
  padding: 24px 0;
}

.asset:first-child {
  padding-top: 0;
}

.asset__header {
  align-items: center;
  display: flex;
  gap: 16px;
  padding-bottom: 8px;
}

.asset__details {
  padding-left: 52px;
}

.queries-card {
  background-color: #e2e8f0;
  border-radius: 12px;
  opacity: 0.3;
  aspect-ratio: 4 / 3;
}

.pool-details {
  background-color: #f8fafc;
  padding: 16px;
  border-radius: 12px;
  font-size: 14px;
}

.pool-details__heading {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}
</style>
